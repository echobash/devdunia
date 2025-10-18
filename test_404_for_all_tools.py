#!/usr/bin/env python3
"""
Test 404 for All Tools
======================

This script tests all HTML files in the current directory by making HTTP requests
to localhost:8000 and displays the results in a tabular format.

Usage:
    python test_404_for_all_tools.py

Requirements:
    pip install requests tabulate
"""

import os
import requests
import time
import re
from tabulate import tabulate
from urllib.parse import urljoin

def get_html_files():
    """Get all HTML files in the current directory and subdirectories."""
    html_files = []
    
    # Get files from current directory
    for file in os.listdir('.'):
        if file.endswith('.html') and os.path.isfile(file):
            html_files.append(file)
    
    # Get files from subdirectories
    for root, dirs, files in os.walk('.'):
        if root != '.':  # Skip current directory (already processed)
            for file in files:
                if file.endswith('.html'):
                    # Create relative path from current directory
                    rel_path = os.path.relpath(os.path.join(root, file), '.')
                    html_files.append(rel_path)
    
    return sorted(html_files)

def get_dashboard_links():
    """Extract all HTML links from dashboard-modern.html."""
    dashboard_file = 'dashboard-modern.html'
    
    if not os.path.exists(dashboard_file):
        print(f"❌ {dashboard_file} not found")
        return []
    
    try:
        with open(dashboard_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find all href attributes pointing to .html files
        pattern = r'href="([^"]*\.html)"'
        matches = re.findall(pattern, content)
        
        # Remove duplicates and sort
        html_links = sorted(list(set(matches)))
        return html_links
    
    except Exception as e:
        print(f"❌ Error reading {dashboard_file}: {e}")
        return []

def test_url(base_url, filename):
    """Test a single URL and return status information."""
    url = urljoin(base_url, filename)
    
    try:
        response = requests.get(url, timeout=10)
        status_code = response.status_code
        status_text = "✅ OK" if status_code == 200 else f"❌ {status_code}"
        response_time = response.elapsed.total_seconds()
        
        return {
            'filename': filename,
            'status_code': status_code,
            'status_text': status_text,
            'response_time': f"{response_time:.2f}s",
            'url': url
        }
    except requests.exceptions.ConnectionError:
        return {
            'filename': filename,
            'status_code': 'CONN_ERR',
            'status_text': '❌ Connection Error',
            'response_time': 'N/A',
            'url': url
        }
    except requests.exceptions.Timeout:
        return {
            'filename': filename,
            'status_code': 'TIMEOUT',
            'status_text': '❌ Timeout',
            'response_time': 'N/A',
            'url': url
        }
    except Exception as e:
        return {
            'filename': filename,
            'status_code': 'ERROR',
            'status_text': f'❌ {str(e)[:20]}...',
            'response_time': 'N/A',
            'url': url
        }

def compare_links_and_files():
    """Compare dashboard links with actual files."""
    print("🔗 Comparing Dashboard Links with Actual Files")
    print("=" * 50)
    
    # Get dashboard links and actual files
    dashboard_links = get_dashboard_links()
    actual_files = get_html_files()
    
    if not dashboard_links:
        print("❌ No links found in dashboard-modern.html")
        return
    
    print(f"📊 Dashboard links: {len(dashboard_links)}")
    print(f"📁 Actual files: {len(actual_files)}")
    print()
    
    # Find mismatches
    missing_files = []  # Links in dashboard but no actual file
    orphaned_files = []  # Actual files but no link in dashboard
    matching_files = []  # Both link and file exist
    
    for link in dashboard_links:
        if link in actual_files:
            matching_files.append(link)
        else:
            missing_files.append(link)
    
    for file in actual_files:
        if file not in dashboard_links and file not in ['dashboard-modern.html', 'index.html', 'home.html']:
            orphaned_files.append(file)
    
    # Display results
    if missing_files:
        print("❌ Missing Files (linked in dashboard but don't exist):")
        for file in missing_files:
            print(f"  - {file}")
        print()
    
    if orphaned_files:
        print("⚠️  Orphaned Files (exist but not linked in dashboard):")
        for file in orphaned_files:
            print(f"  - {file}")
        print()
    
    if matching_files:
        print(f"✅ Matching Files: {len(matching_files)}")
        print()
    
    # Summary
    total_issues = len(missing_files) + len(orphaned_files)
    if total_issues == 0:
        print("🎉 All dashboard links match actual files!")
        return True
    else:
        print(f"🚨 Found {total_issues} mismatches between dashboard links and actual files")
        return False

def main():
    """Main function to test all HTML files."""
    print("🔍 Testing All HTML Tools for 404 Errors")
    print("=" * 50)
    
    # First, compare dashboard links with actual files
    print("Step 1: Checking dashboard links vs actual files...")
    links_match = compare_links_and_files()
    print()
    
    if not links_match:
        print("⚠️  Fix the link mismatches above before proceeding with HTTP tests")
        print("=" * 50)
        print()
    
    # Configuration
    base_url = "http://localhost:8000/"
    
    # Check if server is running
    print("Step 2: Testing HTTP requests...")
    try:
        test_response = requests.get(base_url, timeout=5)
        print(f"✅ Server is running at {base_url}")
    except requests.exceptions.ConnectionError:
        print(f"❌ Server is not running at {base_url}")
        print("Please start your local server first (e.g., python -m http.server 8000)")
        return
    except Exception as e:
        print(f"❌ Error connecting to server: {e}")
        return
    
    # Get all HTML files
    html_files = get_html_files()
    
    if not html_files:
        print("❌ No HTML files found in current directory")
        return
    
    print(f"📁 Found {len(html_files)} HTML files to test")
    print(f"🌐 Testing against: {base_url}")
    print()
    
    # Test each file
    results = []
    print("🔄 Testing files...")
    
    for i, filename in enumerate(html_files, 1):
        print(f"  [{i}/{len(html_files)}] Testing {filename}...", end=" ")
        result = test_url(base_url, filename)
        results.append(result)
        
        # Show immediate result
        if result['status_code'] == 200:
            print("✅")
        else:
            print(f"❌ ({result['status_code']})")
        
        # Small delay to avoid overwhelming the server
        time.sleep(0.1)
    
    print()
    print("📊 Results Summary:")
    print("=" * 50)
    
    # Create table data
    table_data = []
    for result in results:
        table_data.append([
            result['filename'],
            result['status_text'],
            result['response_time']
        ])
    
    # Display table
    headers = ['HTML File', 'Status', 'Response Time']
    print(tabulate(table_data, headers=headers, tablefmt='grid'))
    
    # Summary statistics
    total_files = len(results)
    working_files = len([r for r in results if r['status_code'] == 200])
    broken_files = total_files - working_files
    
    print()
    print("📈 Summary:")
    print(f"  Total files tested: {total_files}")
    print(f"  ✅ Working: {working_files}")
    print(f"  ❌ Broken: {broken_files}")
    
    if broken_files > 0:
        print()
        print("🚨 Broken files:")
        for result in results:
            if result['status_code'] != 200:
                print(f"  - {result['filename']}: {result['status_text']}")
        
        print()
        print("💡 Tips:")
        print("  - Check if the file exists in the directory")
        print("  - Verify the filename matches the link in dashboard-modern.html")
        print("  - Make sure the server is serving files from the correct directory")
    else:
        print()
        print("🎉 All files are working correctly!")
    
    # Final summary
    print()
    print("=" * 50)
    print("📋 FINAL SUMMARY:")
    print("=" * 50)
    
    if links_match and broken_files == 0:
        print("🎉 PERFECT! All checks passed:")
        print("  ✅ Dashboard links match actual files")
        print("  ✅ All HTTP requests successful")
        print("  ✅ Safe to push to git!")
    else:
        print("⚠️  Issues found:")
        if not links_match:
            print("  ❌ Dashboard links don't match actual files")
        if broken_files > 0:
            print(f"  ❌ {broken_files} files have HTTP errors")
        print("  🔧 Fix the issues above before pushing to git")

if __name__ == "__main__":
    main()
