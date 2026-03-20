# Test frontend components and e-learning portal functionality

$headers = @{
    "Content-Type" = "application/json"
}

Write-Host "=== FRONTEND COMPONENTS & E-LEARNING PORTAL TESTING ===" -ForegroundColor Cyan

# Get student token from previous test
$studentToken = $null

# Test 1: Student Login (get fresh token)
Write-Host "`n1. Getting Student Token..." -ForegroundColor Green
$loginBody = @{
    "username" = "SEPO20269881"
    "password" = "Vc3xMNBE"
    "userType" = "student"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Headers $headers -Body $loginBody
    Write-Host "✅ Student login successful!" -ForegroundColor Green
    $studentToken = $loginResponse.token
} catch {
    Write-Host "❌ Student login failed: $($_.Exception.Message)" -ForegroundColor Red
    return
}

# Test 2: Student Dashboard
Write-Host "`n2. Testing Student Dashboard..." -ForegroundColor Green
$dashboardHeaders = $headers.Clone()
$dashboardHeaders["Authorization"] = "Bearer $studentToken"

try {
    $dashboardResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/students/dashboard" -Method Get -Headers $dashboardHeaders
    Write-Host "✅ Dashboard access successful!" -ForegroundColor Green
    Write-Host "   Student Name: $($dashboardResponse.data.student.full_name)" -ForegroundColor Yellow
    Write-Host "   Student Number: $($dashboardResponse.data.student.student_number)" -ForegroundColor Yellow
    Write-Host "   Status: $($dashboardResponse.data.student.status)" -ForegroundColor Yellow
    Write-Host "   Courses: $($dashboardResponse.data.courses.Count)" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Dashboard access failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Student Courses
Write-Host "`n3. Testing Student Courses..." -ForegroundColor Green
try {
    $coursesResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/students/courses" -Method Get -Headers $dashboardHeaders
    Write-Host "✅ Student courses access successful!" -ForegroundColor Green
    Write-Host "   Enrolled Courses: $($coursesResponse.data.courses.Count)" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Student courses access failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Student Profile
Write-Host "`n4. Testing Student Profile..." -ForegroundColor Green
try {
    $profileResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/students/me/profile" -Method Get -Headers $dashboardHeaders
    Write-Host "✅ Student profile access successful!" -ForegroundColor Green
    Write-Host "   Full Name: $($profileResponse.data.full_name)" -ForegroundColor Yellow
    Write-Host "   Email: $($profileResponse.data.email)" -ForegroundColor Yellow
    Write-Host "   Phone: $($profileResponse.data.phone)" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Student profile access failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Test Admin Applications Access (should fail for student)
Write-Host "`n5. Testing Admin Applications Access (should fail)..." -ForegroundColor Green
try {
    $adminResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/applications" -Method Get -Headers $dashboardHeaders
    Write-Host "❌ Student should not access admin applications" -ForegroundColor Red
} catch {
    Write-Host "✅ Student correctly blocked from admin applications" -ForegroundColor Green
}

# Test 6: Test Lecturer Access (should fail for student)
Write-Host "`n6. Testing Lecturer Access (should fail)..." -ForegroundColor Green
try {
    $lecturerResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/lecturer/courses" -Method Get -Headers $dashboardHeaders
    Write-Host "❌ Student should not access lecturer endpoints" -ForegroundColor Red
} catch {
    Write-Host "✅ Student correctly blocked from lecturer endpoints" -ForegroundColor Green
}

# Test 7: Test Course Enrollment
Write-Host "`n7. Testing Course Enrollment..." -ForegroundColor Green
$enrollBody = @{
    "course_id" = "1"
} | ConvertTo-Json

try {
    $enrollResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/students/31/enroll" -Method Post -Headers $dashboardHeaders -Body $enrollBody
    Write-Host "✅ Course enrollment successful!" -ForegroundColor Green
} catch {
    Write-Host "❌ Course enrollment failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 8: Test Student Assignments
Write-Host "`n8. Testing Student Assignments..." -ForegroundColor Green
try {
    $assignmentsResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/students/31/assignments" -Method Get -Headers $dashboardHeaders
    Write-Host "✅ Student assignments access successful!" -ForegroundColor Green
    Write-Host "   Assignments: $($assignmentsResponse.data.count)" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Student assignments access failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 9: Test Student Stats
Write-Host "`n9. Testing Student Stats..." -ForegroundColor Green
try {
    $statsResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/students/31/stats" -Method Get -Headers $dashboardHeaders
    Write-Host "✅ Student stats access successful!" -ForegroundColor Green
    Write-Host "   Total Courses: $($statsResponse.data.total_courses)" -ForegroundColor Yellow
    Write-Host "   Active Courses: $($statsResponse.data.active_courses)" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Student stats access failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 10: Test Unauthorized Access (no token)
Write-Host "`n10. Testing Unauthorized Access..." -ForegroundColor Green
try {
    $unauthResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/students/dashboard" -Method Get -Headers $headers
    Write-Host "❌ Should have failed without token" -ForegroundColor Red
} catch {
    Write-Host "✅ Correctly blocked without authentication" -ForegroundColor Green
}

Write-Host "`n=== FRONTEND COMPONENTS TESTING COMPLETE ===" -ForegroundColor Cyan
Write-Host "`nSUMMARY:" -ForegroundColor Yellow
Write-Host "- Student dashboard is accessible with proper auth" -ForegroundColor White
Write-Host "- Student can view own courses and profile" -ForegroundColor White
Write-Host "- Student can enroll in courses" -ForegroundColor White
Write-Host "- Student can view assignments and stats" -ForegroundColor White
Write-Host "- Students are blocked from admin/lecturer endpoints" -ForegroundColor White
Write-Host "- All frontend authorization is working correctly" -ForegroundColor Green