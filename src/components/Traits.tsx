import { motion } from 'motion/react';
import { Lightbulb, Target, Globe } from 'lucide-react';

const traits = [
  {
    icon: <Lightbulb className="w-12 h-12 text-cyan-400" />,
    title: "无界探索者",
    desc: "跨界融合，突破常规。敏锐捕捉行业新动态，将快消、文旅的创意嫁接到能源产品，以搭积木的心态不断尝试新组合。"
  },
  {
    icon: <Target className="w-12 h-12 text-purple-400" />,
    title: "极致追求者",
    desc: "对自己高要求，不满足于任务本身。在混沌中寻找最优解，即使成功率仅5%，也会尝试20次以拼出惊喜。"
  },
  {
    icon: <Globe className="w-12 h-12 text-emerald-400" />,
    title: "战略思考者",
    desc: "具备全局意识，从战略层面把控迭代方向。推己及人，平衡团队工作量与项目目标，实现高效交付。"
  }
];

export default function Traits() {
  return (
    <section className="relative z-10 py-24 px-6 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-16 tracking-tight"
        >
          个人特质 <span className="text-cyan-500">.</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {traits.map((trait, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group"
            >
              <div className="mb-6 p-4 bg-white/5 rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                {trait.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">{trait.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {trait.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
