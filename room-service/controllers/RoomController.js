require("module-alias/register");
const { PrismaClient } = require("@prisma/client");
const { rooms, equipements } = new PrismaClient();

module.exports = {
  index: async (req, res, next) => {
    try {
      const rooms_ = await rooms.findMany({
        include: { equipements: true },
      });
      return res.json(rooms_);
    } catch (error) {
      next(error);
    }
  },

  store: async (req, res, next) => {
    try {
      const new_room = await rooms.create({
        data: req.body,
      });
      return res.json(new_room);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;

      const update_room = await rooms.update({
        where: { id: +id },
        data: req.body,
      });
      return res.json(update_room);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const delete_room = await rooms.delete({
        where: { id: +id },
      });

      return res.json(delete_room);
    } catch (error) {
      next(error);
    }
  },

  show: async (req, res, next) => {
    try {
      const { id } = req.params;

      const room = await rooms.findFirst({
        where: { id: +id },
        include: { equipements: true },
      });

      return res.json(room);
    } catch (error) {
      next(error);
    }
  },
};
