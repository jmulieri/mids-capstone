FROM python:3.10-slim as venv

# set bash as the shell for this build
SHELL ["/bin/bash", "-c"]

# install some basic tools
RUN set -euo pipefail && \
    apt update && \
    apt install -y curl \
                   build-essential \
                   libffi-dev && \
    rm -rf /var/lib/apt/lists/*

# install poetry
ENV POETRY_VERSION=1.6.1
RUN curl -sSL https://install.python-poetry.org | python

# ensure that the poetry binary is available on the path
ENV PATH=/root/.local/bin:${PATH}

# copy the poetry config and install dependencies into a virtual environment
COPY pyproject.toml ./
RUN python -m venv --copies /app/venv
ARG POETRY_OPTIONS
RUN . /app/venv/bin/activate && \
    poetry install ${POETRY_OPTIONS}


FROM python:3.10-slim as app

# set the working directory
WORKDIR /app

# copy the virtual environment from the previous stage
COPY --from=venv /app/venv /app/venv
ENV PATH=/app/venv/bin:${PATH}

# copy the source code
COPY src ./src

# define the command to run the application
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0"]
