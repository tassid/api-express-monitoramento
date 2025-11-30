import mongoose from "mongoose";
import sendDataToQueue from "../../core/rabbitMq/rabbitmq.service.js";

class TurbidityService {
  constructor(turbidityRepository) {
    this.turbidityRepository = turbidityRepository;
  }

  async getAllTurbidityRecords() {
    try {
      return await this.turbidityRepository.findAll();
    } catch (error) {
      throw new Error("Error fetching turbidity records: " + error.message);
    }
  }

  async getTurbidityRecordById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid turbidity record ID");
      }

      const record = await this.turbidityRepository.findById(id);
      if (!record) throw new Error("turbidity record not found");
      return record;
    } catch (error) {
      throw new Error("Error fetching turbidity record: " + error.message);
    }
  }

  async createTurbidityRecord(data) {
    try {
      if (data.value === undefined || typeof data.value !== "number") {
        throw new Error("Turbidity value must be a number");
      }

      if (data.value > 5) {
        console.log("Turbidez alterada! Enviando para fila de alerta");

        const message = "Turbidez acima do limite";

        const warningPayload = {
          type: "Turbidity warning",
          value: data.value,
          message: message,
          timestamp: new Date(),
        };

        await sendDataToQueue(warningPayload);
      }

      return await this.turbidityRepository.create(data);
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new Error("Validation error: " + error.message);
      }
      throw new Error("Error creating turbidity record: " + error.message);
    }
  }

  async updateTurbidityRecord(id, data) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid turbidity record ID");
      }

      const updated = await this.turbidityRepository.update(id, data);
      if (!updated) throw new Error("turbidity record not found");
      return updated;
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new Error("Validation error: " + error.message);
      }
      throw new Error("Error updating turbidity record: " + error.message);
    }
  }

  async deleteTurbidityRecord(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid turbidity record ID");
      }

      const deleted = await this.turbidityRepository.delete(id);
      if (!deleted) throw new Error("turbidity record not found");
      return {
        message: "turbidity record deleted successfully",
        data: deleted,
      };
    } catch (error) {
      throw new Error("Error deleting turbidity record: " + error.message);
    }
  }

  async getLatestRecords(limit = 10) {
    try {
      return await this.turbidityRepository.getLatest(limit);
    } catch (error) {
      throw new Error("Error fetching latest records: " + error.message);
    }
  }

  async getAverageTurbidity() {
    try {
      return await this.turbidityRepository.getAverage();
    } catch (error) {
      throw new Error("Error calculating average: " + error.message);
    }
  }
}

export default TurbidityService;
