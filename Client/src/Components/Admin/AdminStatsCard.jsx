import { motion } from "framer-motion";

const AdminStatsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="bg-white shadow-lg rounded-xl p-6 border border-green-200 flex items-center gap-5"
    >
      <div className={`p-4 rounded-full ${color} text-white`}>
        <Icon size={28} />
      </div>

      <div>
        <h3 className="text-lg text-gray-500">{title}</h3>
        <p className="text-3xl font-bold text-green-700">{value}</p>
      </div>
    </motion.div>
  );
};
export default AdminStatsCard;
