import { motion } from 'motion/react';
import { Briefcase, Code, Database, Globe2 } from 'lucide-react';

const experiences = [
  {
    year: "核心业务架构",
    title: "资深产品专家 - 电力能源系统",
    desc: "主导CIS、EYL_SASB等核心业务系统的规划与落地。实现多市场的高度抽象配置，满足复杂交易场景需求。负责系统重构与数据迁移，确保业务连续性。",
    icon: <Briefcase className="w-6 h-6 text-blue-400" />
  },
  {
    year: "SaaS平台构建",
    title: "数字化转型顾问 - 用户中心(UACS)",
    desc: "设计并实施统一访问控制系统(UACS)，集成多系统权限管理。实现SaaS化三级权限控制与多租户管理，提升系统安全性与效率。",
    icon: <Code className="w-6 h-6 text-purple-400" />
  },
  {
    year: "数据驱动决策",
    title: "数据产品负责人 - BI与埋点",
    desc: "构建财务、交易及业务系统的数据报表体系。通过埋点与数据分析，驱动产品迭代。持有Oracle AI证书，探索智能化应用。",
    icon: <Database className="w-6 h-6 text-emerald-400" />
  },
  {
    year: "全球交付与管理",
    title: "项目总负责人 - 跨国实施",
    desc: "负责非洲项目执行，协调客户与业务实施团队。带教并培养3名成熟产品经理，负责团队建设与人才梯队搭建。",
    icon: <Globe2 className="w-6 h-6 text-orange-400" />
  }
];

export default function Experience() {
  return (
    <section className="relative z-10 py-24 px-6 bg-black/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-20 tracking-tight"
        >
          职业履历 <span className="text-blue-500">.</span>
        </motion.h2>

        <div className="relative mt-20">
          {/* Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -ml-[1px]" />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 -ml-[10px] w-5 h-5 rounded-full bg-black border-4 border-blue-500 z-20 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

                {/* Content Card */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                  index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'
                }`}>
                  <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-blue-500/30 transition-colors backdrop-blur-sm">
                    <div className={`flex items-center gap-3 mb-4 ${
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}>
                      <div className="p-2 bg-white/10 rounded-lg shrink-0">
                        {exp.icon}
                      </div>
                      <span className="text-sm font-mono text-blue-400 tracking-wider uppercase">{exp.year}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{exp.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
