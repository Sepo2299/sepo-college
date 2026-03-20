# PowerShell script to test the sepocollege-website API endpoints

# Test the authentication endpoint
Write-Host "Testing Authentication Endpoint..." -ForegroundColor Green

# Method 1: Using Invoke-WebRequest with proper hashtable syntax
$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    "username" = "testuser"
    "password" = "testpassword"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" -Method Post -Headers $headers -Body $body
    Write-Host "Registration successful!" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Yellow
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test login endpoint
try {
    $loginBody = @{
        "username" = "testuser"
        "password" = "testpassword"
    } | ConvertTo-Json
    
    $loginResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" -Method Post -Headers $headers -Body $loginBody
    Write-Host "Login successful!" -ForegroundColor Green
    Write-Host "Response: $($loginResponse.Content)" -ForegroundColor Yellow
} catch {
    Write-Host "Login failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Alternative method using Invoke-RestMethod (simpler for REST APIs)
Write-Host "`nUsing Invoke-RestMethod..." -ForegroundColor Cyan

try {
    $restResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Headers $headers -Body $body
    Write-Host "REST Method Registration successful!" -ForegroundColor Green
    Write-Host "Response: $($restResponse | ConvertTo-Json -Compress)" -ForegroundColor Yellow
} catch {
    Write-Host "REST Method Error: $($_.Exception.Message)" -ForegroundColor Red
}