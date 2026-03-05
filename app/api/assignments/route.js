/**
 * @swagger
 * components:
 *   schemas:
 *     Assignment:
 *       type: object
 *       required:
 *         - title
 *         - subject
 *         - dueDate
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         title:
 *           type: string
 *           description: Assignment title
 *         subject:
 *           type: string
 *           description: Subject name
 *         dueDate:
 *           type: string
 *           description: Due date (YYYY-MM-DD)
 *         description:
 *           type: string
 *           description: Assignment description
 *         createdAt:
 *           type: string
 *           description: Creation timestamp
 *       example:
 *         id: 1
 *         title: REST API Assignment
 *         subject: Web Programming
 *         dueDate: 2026-03-05
 *         description: Build a Next.js REST API
 *         createdAt: 2026-03-05T09:00:00.000Z
 */

/**
 * @swagger
 * /api/assignments:
 *   get:
 *     summary: Get all assignments
 *     tags: [Assignments]
 *     responses:
 *       200:
 *         description: List of all assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Assignment'
 *   post:
 *     summary: Create a new assignment
 *     tags: [Assignments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - subject
 *               - dueDate
 *             properties:
 *               title:
 *                 type: string
 *               subject:
 *                 type: string
 *               dueDate:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Assignment created successfully
 *       400:
 *         description: Missing required fields
 */

import { NextResponse } from 'next/server';

global.assignments = global.assignments || [
  {
    id: 1,
    title: "REST API Design",
    description: "Design and build a REST API using Next.js",
    status: "On Process",
    assignmentDate: "2026-03-01T08:00:00.000Z",
    dueDate: "2026-03-10"
  },
  {
    id: 2,
    title: "Database Normalization",
    description: "Normalize a given database schema to 3NF",
    status: "Create",
    assignmentDate: "2026-03-02T09:00:00.000Z",
    dueDate: "2026-03-12"
  },
  {
    id: 3,
    title: "Binary Search Tree",
    description: "Implement a BST with insert, delete, and search",
    status: "Submitted",
    assignmentDate: "2026-03-03T10:00:00.000Z",
    dueDate: "2026-03-15"
  }
];

global.nextId = global.nextId || 4;

export async function GET() {
  return NextResponse.json({ success: true, data: global.assignments });
}

export async function POST(request) {
  const body = await request.json();
  const { title, description, dueDate, status } = body;

  if (!title || !dueDate) {
    return NextResponse.json(
      { success: false, message: 'title and dueDate are required' },
      { status: 400 }
    );
  }

  const validStatuses = ['Create', 'On Process', 'Submitted'];
  if (status && !validStatuses.includes(status)) {
    return NextResponse.json(
      { success: false, message: 'status must be Create, On Process, or Submitted' },
      { status: 400 }
    );
  }

  const newAssignment = {
    id: global.nextId,
    title,
    description: description || '',
    status: status || 'Create',
    assignmentDate: new Date().toISOString(),
    dueDate
  };

  global.assignments.push(newAssignment);
  global.nextId++;

  return NextResponse.json({ success: true, data: newAssignment }, { status: 201 });
}