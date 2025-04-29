import express from 'express'
import cors from 'cors'
import path from 'path';
import fs from 'fs';  // <-- Import the 'fs' module

import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js' 
import settingRouter from './routes/setting.js'
import attendanceRouter from './routes/attendance.js'
import dashboardRouter from './routes/dashboard.js'
import connectToDatabase from './db/db.js'
import locationRoute from './routes/location.js'  //location



// Ensure the 'uploads' directory exists
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

connectToDatabase() 
const app = express() 
app.use(cors())
app.use(express.json())
app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/setting', settingRouter)
app.use('/api/attendance', attendanceRouter)
app.use('/api/location', locationRoute)
app.use('/api/dashboard', dashboardRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port ${process.env.PORT}`)
})
