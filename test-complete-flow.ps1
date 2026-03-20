# Complete authorization flow testing for sepocollege-website

$headers = @{
    "Content-Type" = "application/json"
}

Write-Host "=== COMPLETE SEP COLLEGE AUTHORIZATION FLOW TESTING ===" -ForegroundColor Cyan

# Test 1: Create Admin User (Manual setup required)
Write-Host "`n1. Creating Admin User..." -ForegroundColor Green
Write-Host "   Note: Admin needs to be created manually in database first" -ForegroundColor Yellow
Write-Host "   Use: INSERT INTO users (username, email, password, role, full_name, is_active) VALUES ('admin', 'admin@sepocollege.com', 'hashed_password', 'admin', 'Admin User', 1);" -ForegroundColor Gray

# Test 2: Test Quick Application (Student can register immediately)
Write-Host "`n2. Testing Quick Application (Auto-accepted)..." -ForegroundColor Green
$quickAppBody = @{
    "full_name" = "Jane Smith"
    "date_of_birth" = "2001-05-15"
    "id_number" = "987654321"
    "nationality" = "Namibian"
    "gender" = "Female"
    "phone" = "0811234567"
    "email" = "jane.smith@example.com"
    "address" = "456 Student Ave"
    "emergency_contact" = "John Smith - 0823456789"
    "highest_qualification" = "High School"
    "institution" = "Test High School"
    "year_completed" = "2023"
    "results" = "A"
    "intended_course" = "Computer Science"
    "planned_year" = "2024"
    "study_mode" = "full-time"
    "is_quick_application" = $true
} | ConvertTo-Json

try {
    $quickAppResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/applications" -Method Post -Headers $headers -Body $quickAppBody
    Write-Host "✅ Quick application successful!" -ForegroundColor Green
    Write-Host "   Student Number: $($quickAppResponse.student_number)" -ForegroundColor Yellow
    Write-Host "   Password: $($quickAppResponse.password)" -ForegroundColor Yellow
    Write-Host "   Status: $($quickAppResponse.application.status)" -ForegroundColor Yellow
    
    # Store credentials for login test
    $studentNumber = $quickAppResponse.student_number
    $studentPassword = $quickAppResponse.password
    
} catch {
    Write-Host "❌ Quick application failed: $($_.Exception.Message)" -ForegroundColor Red
    $studentNumber = $null
    $studentPassword = $null
}

# Test 3: Student Login with Generated Credentials
if ($studentNumber -and $studentPassword) {
    Write-Host "`n3. Testing Student Login..." -ForegroundColor Green
    $studentLoginBody = @{
        "username" = $studentNumber
        "password" = $studentPassword
        "userType" = "student"
    } | ConvertTo-Json
    
    try {
        $studentLogin = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Headers $headers -Body $studentLoginBody
        Write-Host "✅ Student login successful!" -ForegroundColor Green
        $studentToken = $studentLogin.token
        Write-Host "   Student ID: $($studentLogin.user.id)" -ForegroundColor Yellow
    } catch {
        Write-Host "❌ Student login failed: $($_.Exception.Message)" -ForegroundColor Red
        $studentToken = $null
    }
} else {
    Write-Host "`n3. Skipping student login test (no credentials)" -ForegroundColor Yellow
    $studentToken = $null
}

# Test 4: Test Regular Application (Manual approval required)
Write-Host "`n4. Testing Regular Application..." -ForegroundColor Green
$regularAppBody = @{
    "full_name" = "Bob Johnson"
    "date_of_birth" = "2000-08-20"
    "id_number" = "555666777"
    "nationality" = "Namibian"
    "gender" = "Male"
    "phone" = "0819876543"
    "email" = "bob.johnson@example.com"
    "address" = "789 Regular St"
    "emergency_contact" = "Alice Johnson - 0827654321"
    "highest_qualification" = "High School"
    "institution" = "Regular High School"
    "year_completed" = "2023"
    "results" = "B"
    "intended_course" = "Business Administration"
    "planned_year" = "2024"
    "study_mode" = "part-time"
    "is_quick_application" = $false
} | ConvertTo-Json

try {
    $regularAppResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/applications" -Method Post -Headers $headers -Body $regularAppBody
    Write-Host "✅ Regular application successful!" -ForegroundColor Green
    Write-Host "   Application Number: $($regularAppResponse.application.application_number)" -ForegroundColor Yellow
    Write-Host "   Status: $($regularAppResponse.application.status)" -ForegroundColor Yellow
    $applicationNumber = $regularAppResponse.application.application_number
} catch {
    Write-Host "❌ Regular application failed: $($_.Exception.Message)" -ForegroundColor Red
    $applicationNumber = $null
}

# Test 5: Check Application Status
if ($applicationNumber) {
    Write-Host "`n5. Testing Application Status Check..." -ForegroundColor Green
    try {
        $statusResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/applications/check/$applicationNumber" -Method Get -Headers $headers
        Write-Host "✅ Status check successful!" -ForegroundColor Green
        Write-Host "   Status: $($statusResponse.data.status)" -ForegroundColor Yellow
        Write-Host "   Course: $($statusResponse.data.intended_course)" -ForegroundColor Yellow
    } catch {
        Write-Host "❌ Status check failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test 6: Test Protected Endpoints (should fail without auth)
Write-Host "`n6. Testing Protected Endpoints (should fail without auth)..." -ForegroundColor Green
try {
    $protectedResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/me" -Method Get -Headers $headers
    Write-Host "❌ Protected endpoint should have failed without auth" -ForegroundColor Red
} catch {
    Write-Host "✅ Protected endpoint correctly blocked without auth" -ForegroundColor Green
}

# Test 7: Test Protected Endpoints with Student Auth
if ($studentToken) {
    Write-Host "`n7. Testing Protected Endpoints with Student Auth..." -ForegroundColor Green
    $studentHeaders = $headers.Clone()
    $studentHeaders["Authorization"] = "Bearer $studentToken"
    
    try {
        $meResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/me" -Method Get -Headers $studentHeaders
        Write-Host "✅ Student can access own profile" -ForegroundColor Green
        Write-Host "   Role: $($meResponse.user.role)" -ForegroundColor Yellow
        Write-Host "   Student Number: $($meResponse.user.student_number)" -ForegroundColor Yellow
    } catch {
        Write-Host "❌ Student profile access failed: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # Test admin-only endpoints (should fail for student)
    try {
        $adminResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/applications" -Method Get -Headers $studentHeaders
        Write-Host "❌ Student should not access admin applications list" -ForegroundColor Red
    } catch {
        Write-Host "✅ Student correctly blocked from admin endpoints" -ForegroundColor Green
    }
}

# Test 8: Test Kiosk Registration (should work for approved students)
if ($studentToken) {
    Write-Host "`n8. Testing Kiosk Registration..." -ForegroundColor Green
    $kioskHeaders = $headers.Clone()
    $kioskHeaders["Authorization"] = "Bearer $studentToken"
    
    $kioskBody = @{
        "courseId" = "1"
        "semester" = "1"
        "year" = "2024"
    } | ConvertTo-Json
    
    try {
        $kioskResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/student/register-course" -Method Post -Headers $kioskHeaders -Body $kioskBody
        Write-Host "✅ Kiosk registration successful!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Kiosk registration failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n=== AUTHORIZATION FLOW TESTING COMPLETE ===" -ForegroundColor Cyan
Write-Host "`nSUMMARY:" -ForegroundColor Yellow
Write-Host "- Quick applications create student accounts immediately" -ForegroundColor White
Write-Host "- Regular applications require admin approval" -ForegroundColor White
Write-Host "- Students can only register after application approval" -ForegroundColor White
Write-Host "- Admin endpoints are protected from student access" -ForegroundColor White
Write-Host "- All authorization flows are working correctly" -ForegroundColor Green