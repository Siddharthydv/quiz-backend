"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../prismaClient"));
const express_1 = require("express");
const quizRouter = (0, express_1.Router)();
quizRouter.get('/healthy', (_req, res) => {
    res.json("healthy");
});
quizRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const quiz = yield prismaClient_1.default.quiz.create({
            data: { title, description },
        });
        res.status(201).json(quiz);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
/**
 * @route GET /quizzes
 * @desc Get all quizzes
 */
quizRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizzes = yield prismaClient_1.default.quiz.findMany();
        res.json(quizzes);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
/**
 * @route GET /quizzes/:id
 * @desc Get quiz details by ID
 */
quizRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const quiz = yield prismaClient_1.default.quiz.findUnique({ where: { id } });
        if (!quiz) {
            res.status(404).json({ error: "Quiz not found" });
            return;
        }
        res.json(quiz);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
/**
 * @route PUT /quizzes/:id
 * @desc Update quiz title or description
 */
quizRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedQuiz = yield prismaClient_1.default.quiz.update({
            where: { id },
            data: { title, description },
        });
        res.status(201).json(updatedQuiz);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
/**
 * @route DELETE /quizzes/:id
 * @desc Delete a quiz
 */
quizRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prismaClient_1.default.quiz.delete({ where: { id } });
        res.status(201).json({ message: "Quiz deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = quizRouter;
