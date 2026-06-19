# Official Playwright Python image — browsers & OS deps preinstalled.
FROM mcr.microsoft.com/playwright/python:v1.61.0-noble

WORKDIR /app
ENV CI=true

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["pytest", "-n", "auto", "--browser", "chromium"]
