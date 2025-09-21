import { Router } from "express";

import { borrowBook, getLoans, returnBook } from "@controllers/loan/loan.controller.ts";

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Loan:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         userId:
 *           type: number
 *         bookId:
 *           type: number
 *         borrowedAt:
 *           type: string
 *           format: date-time
 *         dueDate:
 *           type: string
 *           format: date-time
 *         returned:
 *           type: boolean
 */

/**
 * @openapi
 * /loans:
 *   get:
 *     summary: Get all loans
 *     tags: [Loans]
 *     responses:
 *       200:
 *         description: List of loans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 */
router.get("/", getLoans);

/**
 * @openapi
 * /loans/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *               bookId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Loan created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 */
router.post("/borrow", borrowBook);

/**
 * @openapi
 * /loans/return/{id}:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Loan ID
 *     responses:
 *       200:
 *         description: Book returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 *       404:
 *         description: Loan not found
 */
router.post("/return/:id", returnBook);

export default router;
