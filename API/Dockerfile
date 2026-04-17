#Declare the .NET version to use as a build argument, with a default value of 10.0
ARG DOTNET_VERSION=10.0

FROM mcr.microsoft.com/dotnet/sdk:${DOTNET_VERSION} AS build
WORKDIR /src

#first copy the solution file to the container
COPY ["API/API.csproj", "API/"]
RUN dotnet restore "API/API.csproj"

#then copy the rest of the source code to the container
COPY . .
WORKDIR "/src/API"
#Build the project in Release configuration and output the published files to /app/publish
RUN dotnet publish "API.csproj" -c Release -o /app/publish

#Use the ASP.NET runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:${DOTNET_VERSION} AS runtime
WORKDIR /app
#Copy the published files from the build stage to the runtime stage
COPY --from=build /app/publish .

# Set default listening URLs: HTTP on 5000, HTTPS on 5001 (can be overridden at runtime)
# To enable HTTPS in the container, mount a PFX at `/https/aspnetapp.pfx`
# and pass its password through `ASPNETCORE_Kestrel__Certificates__Default__Password`.
ENV ASPNETCORE_URLS="http://+:5001"
EXPOSE 5001
ENTRYPOINT [ "dotnet", "API.dll" ]

