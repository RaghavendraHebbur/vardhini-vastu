$sitemapPath = "C:\Users\raghu\Documents\Vardhini Vastu Rebuild website\sitemap.xml"
$outputPath  = "C:\Users\raghu\VV\url_test_results.csv"
$errorPath   = "C:\Users\raghu\VV\url_errors.txt"

[xml]$sitemap = Get-Content $sitemapPath -Encoding UTF8
$urls = $sitemap.urlset.url | ForEach-Object { $_.loc }

Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host " Vardhini Vastu - Live URL Audit" -ForegroundColor Cyan
Write-Host " Total URLs to test: $($urls.Count)" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan

$results   = [System.Collections.Generic.List[PSObject]]::new()
$errors    = [System.Collections.Generic.List[string]]::new()
$ok        = 0
$notFound  = 0
$redirects = 0
$other     = 0
$i         = 0

foreach ($url in $urls) {
    $i++
    $slug = $url -replace "https://vardhinivastu.in", ""
    $status = 0
    $finalUrl = $url

    try {
        $resp = Invoke-WebRequest -Uri $url -Method Head -MaximumRedirection 5 -ErrorAction Stop -TimeoutSec 15 -UseBasicParsing
        $status = [int]$resp.StatusCode
    } catch [System.Net.WebException] {
        if ($_.Exception.Response) {
            $status = [int]$_.Exception.Response.StatusCode
        } else {
            $status = 0
        }
    } catch {
        $status = 999
    }

    $label = switch ($status) {
        200     { "OK" }
        301     { "REDIRECT-301" }
        302     { "REDIRECT-302" }
        404     { "NOT-FOUND-404" }
        403     { "FORBIDDEN-403" }
        500     { "SERVER-ERROR-500" }
        0       { "TIMEOUT" }
        999     { "CONN-ERROR" }
        default { "STATUS-$status" }
    }

    if ($status -eq 200) {
        Write-Host "[$i/$($urls.Count)] [OK-200]     $slug" -ForegroundColor Green
        $ok++
    } elseif ($status -in 301,302) {
        Write-Host "[$i/$($urls.Count)] [REDIRECT]   $slug" -ForegroundColor Yellow
        $redirects++
    } elseif ($status -eq 404) {
        Write-Host "[$i/$($urls.Count)] [NOT-FOUND]  $slug" -ForegroundColor Red
        $notFound++
        $errors.Add("404 NOT FOUND: $url")
    } else {
        Write-Host "[$i/$($urls.Count)] [$label]  $slug" -ForegroundColor Magenta
        $other++
        $errors.Add("$status ERROR: $url")
    }

    $results.Add([PSCustomObject]@{
        Index      = $i
        Status     = $status
        Label      = $label
        Slug       = $slug
        URL        = $url
    })

    Start-Sleep -Milliseconds 80
}

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host " SUMMARY" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host " [OK]        200 OK        : $ok"       -ForegroundColor Green
Write-Host " [REDIRECT]  Redirects     : $redirects" -ForegroundColor Yellow
Write-Host " [ERROR]     404 Not Found : $notFound"  -ForegroundColor Red
Write-Host " [ERROR]     Other errors  : $other"     -ForegroundColor Magenta
Write-Host " [TOTAL]     URLs tested   : $($urls.Count)"
Write-Host "=====================================================" -ForegroundColor Cyan

$results | Export-Csv -Path $outputPath -NoTypeInformation -Encoding UTF8
Write-Host "Full results saved to: $outputPath" -ForegroundColor White

if ($errors.Count -gt 0) {
    $errors | Out-File -FilePath $errorPath -Encoding UTF8
    Write-Host "ERROR list saved to: $errorPath" -ForegroundColor Red
    Write-Host ""
    Write-Host "--- ALL ERRORS TO FIX ---" -ForegroundColor Red
    $errors | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
} else {
    Write-Host "No errors found! All URLs are live." -ForegroundColor Green
}
