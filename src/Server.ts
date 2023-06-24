import express from "express";
import cors from "cors";
import { Routes } from "./routes/Routes";
import { ApiResponse } from "./api/responses/ApiResponse";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (_req, res) => {
  res.send("Server running on port 3333");
});

/*app.use("/api", Routes);*/

app.use((error: any, _req: any, res: any, _next: any) => {
  if(error?.unauthorized){
    return ApiResponse.error(res, { error: 'Unauthorized' }, 401);
  }
  return ApiResponse.error(res, error, 500);
});

app.listen(3333, () => {
  console.log("Server running on port 3333");
});

