import prismaClient from "../prismaClient";
import { Router } from "express";

const quizRouter = Router();

quizRouter.get('/healthy',(_req,res)=>{
  res.json("healthy");
})

quizRouter.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    const quiz = await prismaClient.quiz.create({
      data: { title, description },
    });

    res.status(201).json(quiz);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/** 
 * @route GET /quizzes
 * @desc Get all quizzes
 */
quizRouter.get("/", async (_req, res) => {
  try {
    const quizzes = await prismaClient.quiz.findMany();
    res.json(quizzes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/** 
 * @route GET /quizzes/:id
 * @desc Get quiz details by ID
 */
quizRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await prismaClient.quiz.findUnique({ where: { id } });

    if (!quiz) {
      res.status(404).json({ error: "Quiz not found" });
      return;
    }
    res.json(quiz);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/** 
 * @route PUT /quizzes/:id
 * @desc Update quiz title or description
 */
quizRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedQuiz = await prismaClient.quiz.update({
      where: { id },
      data: { title, description },
    });

    res.status(201).json(updatedQuiz);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/** 
 * @route DELETE /quizzes/:id
 * @desc Delete a quiz
 */
quizRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prismaClient.quiz.delete({ where: { id } });

    res.status(201).json({ message: "Quiz deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default quizRouter;
