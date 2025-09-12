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
    getHighLevel: vi.fn(),
    updateHighLevel: vi.fn(),
  },
}));

// Import after mocking
import { GET } from "../high-level/route";
import { NextRequest, NextResponse } from "next/server";
import { datastore } from "@/lib/datastore";

describe("/api/high-level", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET", () => {
    it("should return current high level when no parameters provided", async () => {
      const mockHighLevel = { level: 5, player: "TestPlayer" };
      vi.mocked(datastore.getHighLevel).mockResolvedValue(mockHighLevel);

      const mockRequest = {
        url: "http://localhost:3000/api/high-level",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.getHighLevel).toHaveBeenCalledOnce();
      expect(datastore.updateHighLevel).not.toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(mockHighLevel);
    });

    it("should update high level when level and player parameters provided", async () => {
      const newLevel = { level: 10, player: "NewPlayer" };
      vi.mocked(datastore.updateHighLevel).mockResolvedValue(newLevel);

      const mockRequest = {
        url: "http://localhost:3000/api/high-level?level=10&player=NewPlayer",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.updateHighLevel).toHaveBeenCalledWith(10, "NewPlayer");
      expect(datastore.getHighLevel).not.toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(newLevel);
    });

    it("should handle missing player parameter", async () => {
      const mockHighLevel = { level: 3, player: "DefaultPlayer" };
      vi.mocked(datastore.getHighLevel).mockResolvedValue(mockHighLevel);

      const mockRequest = {
        url: "http://localhost:3000/api/high-level?level=5",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.getHighLevel).toHaveBeenCalledOnce();
      expect(datastore.updateHighLevel).not.toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(mockHighLevel);
    });

    it("should handle missing level parameter", async () => {
      const mockHighLevel = { level: 3, player: "DefaultPlayer" };
      vi.mocked(datastore.getHighLevel).mockResolvedValue(mockHighLevel);

      const mockRequest = {
        url: "http://localhost:3000/api/high-level?player=SomePlayer",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.getHighLevel).toHaveBeenCalledOnce();
      expect(datastore.updateHighLevel).not.toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(mockHighLevel);
    });

    it("should handle invalid level parameter by passing NaN to datastore", async () => {
      const mockLevel = { level: NaN, player: "TestPlayer" };
      vi.mocked(datastore.updateHighLevel).mockResolvedValue(mockLevel);

      const mockRequest = {
        url: "http://localhost:3000/api/high-level?level=invalid&player=TestPlayer",
      } as NextRequest;

      await GET(mockRequest);

      // parseInt("invalid") returns NaN, which gets passed to the datastore
      expect(datastore.updateHighLevel).toHaveBeenCalledWith(NaN, "TestPlayer");
      expect(NextResponse.json).toHaveBeenCalledWith(mockLevel);
    });

    it("should handle datastore errors gracefully", async () => {
      vi.mocked(datastore.getHighLevel).mockRejectedValue(
        new Error("Database error")
      );

      const mockRequest = {
        url: "http://localhost:3000/api/high-level",
      } as NextRequest;

      await GET(mockRequest);

      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: "Invalid request" },
        { status: 400 }
      );
    });

    it("should handle URL encoding in player names", async () => {
      const newLevel = { level: 7, player: "Player One" };
      vi.mocked(datastore.updateHighLevel).mockResolvedValue(newLevel);

      const mockRequest = {
        url: "http://localhost:3000/api/high-level?level=7&player=Player%20One",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.updateHighLevel).toHaveBeenCalledWith(7, "Player One");
      expect(NextResponse.json).toHaveBeenCalledWith(newLevel);
    });

    it("should handle zero level", async () => {
      const newLevel = { level: 0, player: "ZeroPlayer" };
      vi.mocked(datastore.updateHighLevel).mockResolvedValue(newLevel);

      const mockRequest = {
        url: "http://localhost:3000/api/high-level?level=0&player=ZeroPlayer",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.updateHighLevel).toHaveBeenCalledWith(0, "ZeroPlayer");
      expect(NextResponse.json).toHaveBeenCalledWith(newLevel);
    });

    it("should handle decimal levels by truncating to integer", async () => {
      const newLevel = { level: 5, player: "DecimalPlayer" };
      vi.mocked(datastore.updateHighLevel).mockResolvedValue(newLevel);

      const mockRequest = {
        url: "http://localhost:3000/api/high-level?level=5.7&player=DecimalPlayer",
      } as NextRequest;

      await GET(mockRequest);

      expect(datastore.updateHighLevel).toHaveBeenCalledWith(
        5,
        "DecimalPlayer"
      );
      expect(NextResponse.json).toHaveBeenCalledWith(newLevel);
    });
  });
});
