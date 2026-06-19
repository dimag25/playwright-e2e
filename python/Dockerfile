# Official Playwright Python image — browsers & OS deps preinstalled.
# Note: the Playwright Python package/image trails the JS release; 1.60 is the
# latest Python tag (JS is at 1.61).
FROM mcr.microsoft.com/playwright/python:v1.60.0-noble

WORKDIR /app
ENV CI=true

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["pytest", "-n", "auto", "--browser", "chromium"]
