# Quick PowerShell test for sepocollege-website API

# Correct PowerShell syntax for API testing
$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    "username" = "testuser"
    "password" = "testpassword"
} | ConvertTo-Json

# Test registration
Write-Host "Testing registration..." -ForegroundColor Green
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Headers $headers -Body $body

# Test login  
Write-Host "Testing login..." -ForegroundColor Green
$loginBody = @{
    "username" = "testuser"
    "password" = "testpassword"
    "userType" = "student"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Headers $headers -Body $loginBody
