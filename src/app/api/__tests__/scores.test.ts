import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock Next.js imports
vi.mock("next/server", () => ({
  NextRequest: vi.fn(),
  NextResponse: {
    json: vi.fn().mockImplementation((data, init) => ({
      json: () => Promise.resolve(data),
      status: init?.status || 200,
      ...init,
    })),
  },
}));

// Mock the datastore
vi.mock("@/lib/datastore", () => ({
  datastore: {
    getLevelScores: vi.fn(),
    updateLevelScore: vi.fn(),
    getAllScores: vi.fn(),
    getChampions: vi.fn(),
    addChampion: vi.fn(),
  },
}));

// Import after mocking
import { GET } from "../scores/route";
import { NextRequest, NextResponse } from "next/server";
import { datastore } from "@/lib/datastore";

describe("/api/scores", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET - Level Scores", () => {
    it("should return level scores for specific level", async () => {
      const mockScores = [
        { score: 1000, player: "Player1" },
        { score: 900, player: "Player2" },
      ];
      vi.mocked(datastore.getLevelScores).mockResolvedValue(mockScores);

      const mockRequest = {
        url: "http://localhost:3000/api/scores?level=1",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.getLevelScores).toHaveBeenCalledWith(1);
      expect(NextResponse.json).toHaveBeenCalledWith({ 1: mockScores });
    });

    it("should update level score when score and player provided", async () => {
      const mockUpdatedScores = [
        { score: 1200, player: "NewPlayer" },
        { score: 1000, player: "Player1" },
      ];
      vi.mocked(datastore.updateLevelScore).mockResolvedValue(
        mockUpdatedScores
      );

      const mockRequest = {
        url: "http://localhost:3000/api/scores?level=1&score=1200&player=NewPlayer",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.updateLevelScore).toHaveBeenCalledWith(
        1,
        1200,
        "NewPlayer"
      );
      expect(NextResponse.json).toHaveBeenCalledWith({ 1: mockUpdatedScores });
    });

    it("should default to level 1 when no level specified", async () => {
      const mockScores = [{ score: 500, player: "DefaultPlayer" }];
      vi.mocked(datastore.getLevelScores).mockResolvedValue(mockScores);

      const mockRequest = {
        url: "http://localhost:3000/api/scores",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.getLevelScores).toHaveBeenCalledWith(1);
      expect(NextResponse.json).toHaveBeenCalledWith({ 1: mockScores });
    });
  });

  describe("GET - All Scores", () => {
    it("should return all scores when level=all", async () => {
      const mockAllScores = new Map([
        [1, [{ score: 1000, player: "Player1" }]],
        [2, [{ score: 900, player: "Player2" }]],
      ]);
      vi.mocked(datastore.getAllScores).mockResolvedValue(mockAllScores);

      const mockRequest = {
        url: "http://localhost:3000/api/scores?level=all",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.getAllScores).toHaveBeenCalledOnce();
      expect(NextResponse.json).toHaveBeenCalledWith({
        1: [{ score: 1000, player: "Player1" }],
        2: [{ score: 900, player: "Player2" }],
      });
    });
  });

  describe("GET - Champions", () => {
    it("should return champions when level=champs", async () => {
      const mockChampions = [
        { score: 5000, player: "Champion1" },
        { score: 4500, player: "Champion2" },
      ];
      vi.mocked(datastore.getChampions).mockResolvedValue(mockChampions);

      const mockRequest = {
        url: "http://localhost:3000/api/scores?level=champs",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.getChampions).toHaveBeenCalledOnce();
      expect(NextResponse.json).toHaveBeenCalledWith(mockChampions);
    });

    it("should add champion when level=champs with score and player", async () => {
      const mockUpdatedChampions = [
        { score: 5000, player: "OldChampion" },
        { score: 6000, player: "NewChampion" },
      ];
      vi.mocked(datastore.addChampion).mockResolvedValue(mockUpdatedChampions);

      const mockRequest = {
        url: "http://localhost:3000/api/scores?level=champs&score=6000&player=NewChampion",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.addChampion).toHaveBeenCalledWith(6000, "NewChampion");
      expect(NextResponse.json).toHaveBeenCalledWith(mockUpdatedChampions);
    });
  });

  describe("Error Handling", () => {
    it("should handle invalid score parameter by passing NaN to datastore", async () => {
      const mockScores = [{ score: NaN, player: "TestPlayer" }];
      vi.mocked(datastore.updateLevelScore).mockResolvedValue(mockScores);

      const mockRequest = {
        url: "http://localhost:3000/api/scores?level=1&score=invalid&player=TestPlayer",
      } as NextRequest;

      await GET(mockRequest);

      // parseInt("invalid") returns NaN, which gets passed to the datastore
      expect(datastore.updateLevelScore).toHaveBeenCalledWith(
        1,
        NaN,
        "TestPlayer"
      );
      expect(NextResponse.json).toHaveBeenCalledWith({ 1: mockScores });
    });

    it("should handle datastore errors gracefully", async () => {
      vi.mocked(datastore.getLevelScores).mockRejectedValue(
        new Error("Database error")
      );

      const mockRequest = {
        url: "http://localhost:3000/api/scores?level=1",
      } as NextRequest;

      await GET(mockRequest);

      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: "Invalid request" },
        { status: 400 }
      );
    });
  });

  describe("Edge Cases", () => {
    it("should handle URL encoding in player names", async () => {
      const mockUpdatedScores = [{ score: 1000, player: "Player One" }];
      vi.mocked(datastore.updateLevelScore).mockResolvedValue(
        mockUpdatedScores
      );

      const mockRequest = {
        url: "http://localhost:3000/api/scores?level=1&score=1000&player=Player%20One",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.updateLevelScore).toHaveBeenCalledWith(
        1,
        1000,
        "Player One"
      );
      expect(NextResponse.json).toHaveBeenCalledWith({ 1: mockUpdatedScores });
    });

    it("should handle zero score", async () => {
      const mockUpdatedScores = [{ score: 0, player: "ZeroPlayer" }];
      vi.mocked(datastore.updateLevelScore).mockResolvedValue(
        mockUpdatedScores
      );

      const mockRequest = {
        url: "http://localhost:3000/api/scores?level=1&score=0&player=ZeroPlayer",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.updateLevelScore).toHaveBeenCalledWith(
        1,
        0,
        "ZeroPlayer"
      );
      expect(NextResponse.json).toHaveBeenCalledWith({ 1: mockUpdatedScores });
    });

    it("should handle missing parameters gracefully", async () => {
      const mockScores = [{ score: 100, player: "DefaultPlayer" }];
      vi.mocked(datastore.getLevelScores).mockResolvedValue(mockScores);

      const mockRequest = {
        url: "http://localhost:3000/api/scores?level=1&score=1000",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.getLevelScores).toHaveBeenCalledWith(1);
      expect(datastore.updateLevelScore).not.toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith({ 1: mockScores });
    });
  });
});
