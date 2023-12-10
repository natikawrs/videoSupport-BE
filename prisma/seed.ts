import { PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs/promises';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Read Employee JSON file
    const employeeFilePath = path.resolve(__dirname, 'employees.json');
    const employeeData = await fs.readFile(employeeFilePath, 'utf-8');
    const employeeJsonData = JSON.parse(employeeData);

    // Insert data into the Employee table
    for (const employee of employeeJsonData) {
      await prisma.employee.create({
        data: {
          firstName: employee.firstName,
          lastName: employee.lastName,
          salary: employee.salary,
          department: employee.department,
        },
      });
    }

    console.log('Seeding completed.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
