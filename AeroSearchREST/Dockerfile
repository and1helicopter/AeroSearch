FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
WORKDIR /src
COPY ["AeroSearchREST/AeroSearchREST.csproj", "AeroSearchREST/"]
RUN dotnet restore "AeroSearchREST/AeroSearchREST.csproj"
COPY . .
WORKDIR "/src/AeroSearchREST"
RUN dotnet build "AeroSearchREST.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AeroSearchREST.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AeroSearchREST.dll"]