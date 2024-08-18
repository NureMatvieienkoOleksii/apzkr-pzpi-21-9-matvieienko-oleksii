#include <iostream>
#include <chrono>
#include <thread>
#include <random>
#include <ctime>
#include <cstring>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>

class EnvironmentSensor {
private:
    float temperature;
    float humidity;
    float co2Level;
    float windSpeed;

    std::random_device rd;
    std::mt19937 gen;
    std::uniform_real_distribution<> tempDist;
    std::uniform_real_distribution<> humidDist;
    std::uniform_real_distribution<> co2Dist;
    std::uniform_real_distribution<> windDist;

public:
    EnvironmentSensor() : gen(rd()), 
                          tempDist(15.0, 35.0),
                          humidDist(30.0, 90.0),
                          co2Dist(300.0, 1000.0),
                          windDist(0.0, 20.0) {}

    void readSensors() {
        temperature = tempDist(gen);
        humidity = humidDist(gen);
        co2Level = co2Dist(gen);
        windSpeed = windDist(gen);
    }

    std::string getData() {
        return "Temperature: " + std::to_string(temperature) + 
               ", Humidity: " + std::to_string(humidity) + 
               ", CO2: " + std::to_string(co2Level) + 
               ", Wind Speed: " + std::to_string(windSpeed);
    }
};

class WiFiConnection {
private:
    int sock;
    struct sockaddr_in server;

public:
    WiFiConnection() : sock(-1) {}

    bool connect(const char* serverAddress, int port) {
        sock = socket(AF_INET, SOCK_STREAM, 0);
        if (sock == -1) {
            std::cout << "Could not create socket" << std::endl;
            return false;
        }

        server.sin_addr.s_addr = inet_addr(serverAddress);
        server.sin_family = AF_INET;
        server.sin_port = htons(port);

        if (connect(sock, (struct sockaddr *)&server, sizeof(server)) < 0) {
            std::cout << "Connect failed" << std::endl;
            return false;
        }

        std::cout << "Connected to server" << std::endl;
        return true;
    }

    bool sendData(const std::string& data) {
        if (send(sock, data.c_str(), data.length(), 0) < 0) {
            std::cout << "Send failed" << std::endl;
            return false;
        }
        return true;
    }

    void disconnect() {
        close(sock);
    }
};

int main() {
    EnvironmentSensor sensor;
    WiFiConnection wifi;

    if (!wifi.connect("127.0.0.1", 8080)) {
        return 1;
    }

    while (true) {
        sensor.readSensors();
        std::string data = sensor.getData();
        std::cout << "Sending data: " << data << std::endl;

        if (!wifi.sendData(data)) {
            break;
        }

        std::this_thread::sleep_for(std::chrono::seconds(5));
    }

    wifi.disconnect();
    return 0;
}