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
    getHighScore: vi.fn(),
    updateHighScore: vi.fn(),
  },
}));

// Import after mocking
import { GET } from "../high-score/route";
import { NextRequest, NextResponse } from "next/server";
import { datastore } from "@/lib/datastore";

describe("/api/high-score", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET", () => {
    it("should return current high score when no parameters provided", async () => {
      const mockHighScore = { score: 1500, player: "TestPlayer" };
      vi.mocked(datastore.getHighScore).mockResolvedValue(mockHighScore);

      const mockRequest = {
        url: "http://localhost:3000/api/high-score",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.getHighScore).toHaveBeenCalledOnce();
      expect(datastore.updateHighScore).not.toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(mockHighScore);
    });

    it("should update high score when score and player parameters provided", async () => {
      const newScore = { score: 2000, player: "NewPlayer" };
      vi.mocked(datastore.updateHighScore).mockResolvedValue(newScore);

      const mockRequest = {
        url: "http://localhost:3000/api/high-score?score=2000&player=NewPlayer",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.updateHighScore).toHaveBeenCalledWith(2000, "NewPlayer");
      expect(datastore.getHighScore).not.toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(newScore);
    });

    it("should handle missing player parameter", async () => {
      const mockHighScore = { score: 1000, player: "DefaultPlayer" };
      vi.mocked(datastore.getHighScore).mockResolvedValue(mockHighScore);

      const mockRequest = {
        url: "http://localhost:3000/api/high-score?score=1500",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.getHighScore).toHaveBeenCalledOnce();
      expect(datastore.updateHighScore).not.toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(mockHighScore);
    });

    it("should handle missing score parameter", async () => {
      const mockHighScore = { score: 1000, player: "DefaultPlayer" };
      vi.mocked(datastore.getHighScore).mockResolvedValue(mockHighScore);

      const mockRequest = {
        url: "http://localhost:3000/api/high-score?player=SomePlayer",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.getHighScore).toHaveBeenCalledOnce();
      expect(datastore.updateHighScore).not.toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(mockHighScore);
    });

    it("should handle invalid score parameter by passing NaN to datastore", async () => {
      const mockScore = { score: NaN, player: "TestPlayer" };
      vi.mocked(datastore.updateHighScore).mockResolvedValue(mockScore);

      const mockRequest = {
        url: "http://localhost:3000/api/high-score?score=invalid&player=TestPlayer",
      } as NextRequest;

      await GET(mockRequest);

      // parseInt("invalid") returns NaN, which gets passed to the datastore
      expect(datastore.updateHighScore).toHaveBeenCalledWith(NaN, "TestPlayer");
      expect(NextResponse.json).toHaveBeenCalledWith(mockScore);
    });

    it("should handle datastore errors gracefully", async () => {
      vi.mocked(datastore.getHighScore).mockRejectedValue(
        new Error("Database error")
      );

      const mockRequest = {
        url: "http://localhost:3000/api/high-score",
      } as NextRequest;

      await GET(mockRequest);

      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: "Invalid request" },
        { status: 400 }
      );
    });

    it("should handle URL encoding in player names", async () => {
      const newScore = { score: 1500, player: "Player One" };
      vi.mocked(datastore.updateHighScore).mockResolvedValue(newScore);

      const mockRequest = {
        url: "http://localhost:3000/api/high-score?score=1500&player=Player%20One",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.updateHighScore).toHaveBeenCalledWith(
        1500,
        "Player One"
      );
      expect(NextResponse.json).toHaveBeenCalledWith(newScore);
    });

    it("should handle zero score", async () => {
      const newScore = { score: 0, player: "ZeroPlayer" };
      vi.mocked(datastore.updateHighScore).mockResolvedValue(newScore);

      const mockRequest = {
        url: "http://localhost:3000/api/high-score?score=0&player=ZeroPlayer",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.updateHighScore).toHaveBeenCalledWith(0, "ZeroPlayer");
      expect(NextResponse.json).toHaveBeenCalledWith(newScore);
    });

    it("should handle empty player name by treating it as falsy", async () => {
      const mockHighScore = { score: 1000, player: "DefaultPlayer" };
      vi.mocked(datastore.getHighScore).mockResolvedValue(mockHighScore);

      const mockRequest = {
        url: "http://localhost:3000/api/high-score?score=1000&player=",
      } as NextRequest;

      await GET(mockRequest);

      // Empty string is falsy, so it should get the high score instead
      expect(datastore.getHighScore).toHaveBeenCalledOnce();
      expect(datastore.updateHighScore).not.toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(mockHighScore);
    });
  });
});
