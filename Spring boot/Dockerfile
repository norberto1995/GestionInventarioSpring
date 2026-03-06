# Etapa 1: Construcción con Maven y Java 21
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Etapa 2: Ejecución ligera
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto por defecto de Render
EXPOSE 8080

# Limitar memoria para que Render no mate el proceso
ENTRYPOINT ["java", "-Xmx384m", "-Xms256m", "-jar", "app.jar"]
