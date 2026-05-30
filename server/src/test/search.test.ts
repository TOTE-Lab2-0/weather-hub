import request from "supertest"; 
import { describe, expect, it, vi } from "vitest";
import app from "../app";

describe("search routes", () => {
    it("returns 400 when city query is missing", async () => {
        const res = await request(app).get("/api/search"); 

        expect(res.status).toBe(400); 
        expect(res.body).toEqual({ error: "City is required" });
    });

    it("returns 404 when city isn not found", async () => {
        vi.spyOn(global, "fetch").mockResolvedValue({
            json: async () => ({ results: [] }),
        } as Response)

        const res = await request(app).get("/api/search?city=notarealcity");
        expect(res.status).toBe(404); 
        expect(res.body).toEqual({ error: "City not found" }); 
    });
});