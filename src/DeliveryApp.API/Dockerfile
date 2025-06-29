FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy solution and project files
COPY ["DeliveryApp.API/DeliveryApp.API.csproj", "DeliveryApp.API/"]
COPY ["DeliveryApp.Core/DeliveryApp.Core.csproj", "DeliveryApp.Core/"]
COPY ["DeliveryApp.Infrastructure/DeliveryApp.Infrastructure.csproj", "DeliveryApp.Infrastructure/"]

# Restore dependencies
RUN dotnet restore "DeliveryApp.API/DeliveryApp.API.csproj"

# Copy source code
COPY . .

# Build the application
WORKDIR "/src/DeliveryApp.API"
RUN dotnet build "DeliveryApp.API.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "DeliveryApp.API.csproj" -c Release -o /app/publish

# Final stage
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Create directory for SQLite database
RUN mkdir -p /app/data

ENTRYPOINT ["dotnet", "DeliveryApp.API.dll"] 