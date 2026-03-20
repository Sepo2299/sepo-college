# Comprehensive authorization testing for sepocollege-website

$headers = @{
    "Content-Type" = "application/json"
}

Write-Host "=== SEP COLLEGE AUTHORIZATION TESTING ===" -ForegroundColor Cyan

# Test 1: Admin Registration and Login
Write-Host "`n1. Testing Admin Registration..." -ForegroundColor Green
$adminBody = @{
    "username" = "admin"
    "password" = "admin123"
    "role" = "admin"
} | ConvertTo-Json

try {
    $adminReg = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Headers $headers -Body $adminBody
    Write-Host "✅ Admin registration successful" -ForegroundColor Green
    $adminToken = $adminReg.token
} catch {
    Write-Host "❌ Admin registration failed: $($_.Exception.Message)" -ForegroundColor Red
    $adminToken = $null
}

# Test 2: Admin Login
if ($adminToken) {
    Write-Host "`n2. Testing Admin Login..." -ForegroundColor Green
    $adminLoginBody = @{
        "username" = "admin"
        "password" = "admin123"
    } | ConvertTo-Json
    
    try {
        $adminLogin = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Headers $headers -Body $adminLoginBody
        Write-Host "✅ Admin login successful" -ForegroundColor Green
        $adminToken = $adminLogin.token
    } catch {
        Write-Host "❌ Admin login failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test 3: Student Registration (should fail without application)
Write-Host "`n3. Testing Student Registration (should fail without application)..." -ForegroundColor Green
$studentBody = @{
    "username" = "student1"
    "password" = "student123"
    "role" = "student"
} | ConvertTo-Json

$studentHeaders = $headers.Clone()
if ($adminToken) {
    $studentHeaders["Authorization"] = "Bearer $adminToken"
}

try {
    $studentReg = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Headers $studentHeaders -Body $studentBody
    Write-Host "❌ Student registration should have failed (no application)" -ForegroundColor Red
} catch {
    Write-Host "✅ Student registration correctly blocked (no application)" -ForegroundColor Green
}

# Test 4: Create Application
Write-Host "`n4. Testing Application Creation..." -ForegroundColor Green
$appBody = @{
    "firstName" = "John"
    "lastName" = "Doe"
    "email" = "john.doe@example.com"
    "phone" = "1234567890"
    "address" = "123 Test St"
    "dateOfBirth" = "2000-01-01"
    "gender" = "Male"
    "nationality" = "Namibian"
    "idNumber" = "123456789"
    "emergencyContactName" = "Jane Doe"
    "emergencyContactPhone" = "0987654321"
    "emergencyContactRelationship" = "Mother"
    "courseId" = "1"
    "school" = "Computers"
    "yearOfStudy" = "1"
    "previousQualification" = "High School"
    "previousInstitution" = "Test High School"
    "previousGrade" = "A"
    "reasonForChoosing" = "Interest in computers"
    "declaration" = $true
} | ConvertTo-Json

try {
    $appResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/applications" -Method Post -Headers $headers -Body $appBody
    Write-Host "✅ Application created successfully" -ForegroundColor Green
    $applicationId = $appResponse.id
} catch {
    Write-Host "❌ Application creation failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Admin Approval
if ($adminToken -and $applicationId) {
    Write-Host "`n5. Testing Admin Approval..." -ForegroundColor Green
    $approvalHeaders = $headers.Clone()
    $approvalHeaders["Authorization"] = "Bearer $adminToken"
    
    try {
        $approvalResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/applications/$applicationId/approve" -Method Put -Headers $approvalHeaders
        Write-Host "✅ Application approved successfully" -ForegroundColor Green
    } catch {
        Write-Host "❌ Application approval failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test 6: Student Registration After Approval
Write-Host "`n6. Testing Student Registration After Approval..." -ForegroundColor Green
try {
    $studentRegAfter = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Headers $headers -Body $studentBody
    Write-Host "✅ Student registration successful after approval" -ForegroundColor Green
    $studentToken = $studentRegAfter.token
} catch {
    Write-Host "❌ Student registration still failed after approval: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 7: Test Admin Applications Endpoint
if ($adminToken) {
    Write-Host "`n7. Testing Admin Applications List..." -ForegroundColor Green
    $appHeaders = $headers.Clone()
    $appHeaders["Authorization"] = "Bearer $adminToken"
    
    try {
        $applications = Invoke-RestMethod -Uri "http://localhost:5000/api/applications" -Method Get -Headers $appHeaders
        Write-Host "✅ Admin can view applications list" -ForegroundColor Green
        Write-Host "   Found $($applications.Count) applications" -ForegroundColor Yellow
    } catch {
        Write-Host "❌ Admin applications list failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n=== AUTHORIZATION TESTING COMPLETE ===" -ForegroundColor Cyan