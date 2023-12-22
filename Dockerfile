# Stage 1: Building React Application
FROM node:latest as react-build
WORKDIR /app
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_DYNAMIC_BASE_URL
ENV REACT_APP_API_BASE_URL $REACT_APP_API_BASE_URL
ENV REACT_APP_DYNAMIC_BASE_URL $REACT_APP_DYNAMIC_BASE_URL
COPY sale-of-points/package.json sale-of-points/package-lock.json ./
RUN npm install
COPY sale-of-points/ ./
RUN npm run build

# Stage 2: Building Spring Boot Application
FROM openjdk:17 as spring-build
EXPOSE 8080
WORKDIR /app
COPY --from=react-build /app/build /app/src/main/resources/static
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src ./src
RUN chmod +x ./mvnw
RUN ./mvnw package -DskipTests

# Final Stage: Create the final image
FROM openjdk:17
WORKDIR /app
COPY --from=spring-build /app/target/PointOfSale-0.0.1-SNAPSHOT.jar ./target/app.jar
COPY --from=spring-build /app/src/dynamic ./src/dynamic
ENTRYPOINT ["java","-jar","./target/app.jar"]
