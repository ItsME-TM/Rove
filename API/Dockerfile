# Declare global ARG before any FROM statements so it is accessible in all stages
ARG DOTNET_VERSION=10.0

# --- Stage 1: Build the Angular Client ---
FROM node:22-alpine AS client-build
WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY client/package*.json ./client/
RUN cd client && npm ci

# Copy the rest of the client code and build
COPY client/ ./client/
RUN cd client && npm run build

# --- Stage 2: Build the ASP.NET Core API ---
FROM mcr.microsoft.com/dotnet/sdk:${DOTNET_VERSION} AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY ["API/API.csproj", "API/"]
RUN dotnet restore "API/API.csproj"

# Copy the rest of the API code and publish
COPY . .
WORKDIR "/src/API"
RUN dotnet publish "API.csproj" -c Release -o /app/publish

# --- Stage 3: Final Runtime Image ---
FROM mcr.microsoft.com/dotnet/aspnet:${DOTNET_VERSION} AS runtime
WORKDIR /app

# Copy published API files
COPY --from=build /app/publish .

# Copy compiled Angular client files to the API's wwwroot folder
COPY --from=client-build /app/client/dist/client/browser ./wwwroot

# Expose port 5001 as the default fallback
EXPOSE 5001

ENTRYPOINT [ "dotnet", "API.dll" ]
