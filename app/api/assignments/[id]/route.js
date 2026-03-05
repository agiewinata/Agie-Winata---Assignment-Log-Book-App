/**
 * @swagger
 * /api/assignments/{id}:
 *   get:
 *     summary: Get assignment by ID
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Assignment ID
 *     responses:
 *       200:
 *         description: Assignment found
 *       404:
 *         description: Assignment not found
 *   put:
 *     summary: Update an assignment
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *       200:
 *         description: Assignment updated successfully
 *       404:
 *         description: Assignment not found
 *   delete:
 *     summary: Delete an assignment
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Assignment deleted successfully
 *       404:
 *         description: Assignment not found
 */

import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const id = parseInt(params.id);
  const assignment = global.assignments?.find(a => a.id === id);

  if (!assignment) {
    return NextResponse.json(
      { success: false, message: `Assignment with id ${id} not found` },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: assignment });
}

export async function PUT(request, { params }) {
  const id = parseInt(params.id);
  const index = global.assignments?.findIndex(a => a.id === id);

  if (index === -1) {
    return NextResponse.json(
      { success: false, message: `Assignment with id ${id} not found` },
      { status: 404 }
    );
  }

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

  global.assignments[index] = {
    ...global.assignments[index],
    title,
    description: description || '',
    status: status || global.assignments[index].status,
    dueDate
  };

  return NextResponse.json({ success: true, data: global.assignments[index] });
}

export async function DELETE(request, { params }) {
  const id = parseInt(params.id);
  const index = global.assignments?.findIndex(a => a.id === id);

  if (index === -1) {
    return NextResponse.json(
      { success: false, message: `Assignment with id ${id} not found` },
      { status: 404 }
    );
  }

  const deleted = global.assignments.splice(index, 1);
  return NextResponse.json({
    success: true,
    message: 'Assignment deleted successfully',
    data: deleted[0]
  });
} 