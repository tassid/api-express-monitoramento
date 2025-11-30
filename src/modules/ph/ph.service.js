import mongoose from "mongoose";
import sendDataToQueue from "../../core/rabbitMq/rabbitmq.service.js";

class PhService {
  constructor(phRepository) {
    this.phRepository = phRepository;
  }

  async getAllPhRecords() {
    try {
      return await this.phRepository.findAll();
    } catch (error) {
      throw new Error("Error fetching pH records: " + error.message);
    }
  }

  async getPhRecordById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid pH record ID");
      }

      const record = await this.phRepository.findById(id);
      if (!record) {
        throw new Error("pH record not found");
      }
      return record;
    } catch (error) {
      throw new Error("Error fetching pH record: " + error.message);
    }
  }

  async createPhRecord(data) {
    try {
      if (!data.value || data.value < 0 || data.value > 14) {
        throw new Error("pH value must be between 0 and 14");
      }

      if (data.value > 8 || data.value < 6) {
        console.log("PH alterado! Enviando para fila de alerta");

        const message =
          data.value < 6
            ? "PH abaixo do valor recomendado"
            : "PH acima do valor recomendado";

        const warningPayload = {
          type: "PH warning",
          value: data.value,
          message: message,
          timestamp: new Date(),
        };

        await sendDataToQueue(warningPayload);
      }

      return await this.phRepository.create(data);
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new Error("Validation error: " + error.message);
      }
      throw new Error("Error creating pH record: " + error.message);
    }
  }

  async updatePhRecord(id, data) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid pH record ID");
      }

      const updatedRecord = await this.phRepository.update(id, data);
      if (!updatedRecord) {
        throw new Error("pH record not found");
      }
      return updatedRecord;
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new Error("Validation error: " + error.message);
      }
      throw new Error("Error updating pH record: " + error.message);
    }
  }

  async deletePhRecord(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid pH record ID");
      }

      const deleted = await this.phRepository.delete(id);
      if (!deleted) {
        throw new Error("pH record not found");
      }
      return { message: "pH record deleted successfully", data: deleted };
    } catch (error) {
      throw new Error("Error deleting pH record: " + error.message);
    }
  }

  async getLatestRecords(limit = 10) {
    try {
      return await this.phRepository.getLatest(limit);
    } catch (error) {
      throw new Error("Error fetching latest records: " + error.message);
    }
  }

  async getRecordsByDateRange(startDate, endDate) {
    try {
      return await this.phRepository.findByDateRange(startDate, endDate);
    } catch (error) {
      throw new Error("Error fetching records by date: " + error.message);
    }
  }

  async getAveragePhValue() {
    try {
      return await this.phRepository.getAverage();
    } catch (error) {
      throw new Error("Error calculating average: " + error.message);
    }
  }
}

export default PhService;
