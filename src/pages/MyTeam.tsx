import React from "react";

export default function MyTeam() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const people = [
    { initials: "JZ", name: "Jitesh Zahir", variant: "present" },
    { initials: "AL", name: "Allen Smith", variant: "on-duty" },
    { initials: "NY", name: "Nabil Yaseen Baig", variant: "present" },
  ];

  const statusClass = (day: number, variant = "present") => {
    if (day % 7 === 0 || day % 7 === 6) return "bg-surface-container-high";
    if (variant === "on-duty") return "bg-primary-fixed";
    if (variant === "leave") return "bg-error-container";
    if (variant === "holiday") return "bg-tertiary-container";
    return "bg-secondary-container";
  };

  return (
    <div className="ml-20 pt-24 pb-12 px-8">
      {/* Header Section */}
      <div className="mb-12 pt-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-display-lg font-extrabold text-on-background tracking-tight">My Team</h1>
          <p className="text-body-md text-on-surface-variant mt-2 max-w-lg">Real-time oversight of your team's presence and availability. Curating a high-performance culture through transparency.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-surface-container-lowest px-4 py-2 rounded-md ambient-shadow flex items-center gap-3 cursor-pointer hover:bg-surface-bright transition-colors">
            <span className="material-symbols-outlined text-primary">calendar_today</span>
            <span className="font-semibold text-on-surface">June 2024</span>
            <span className="material-symbols-outlined text-outline">expand_more</span>
          </div>
          <button className="gradient-primary text-on-primary font-bold px-6 py-2 rounded-md ambient-shadow hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">how_to_reg</span>
            Mark Attendance
          </button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-surface-container-lowest p-6 rounded-md ambient-shadow flex justify-between items-center border-l-4 border-secondary">
          <div>
            <h3 className="text-label-sm font-bold text-outline-variant uppercase tracking-widest mb-1">Who is off today</h3>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-extrabold text-secondary">12</span>
              <span className="text-on-surface-variant text-sm mb-1 font-medium">Team members</span>
            </div>
          </div>
          <div className="flex -space-x-3 overflow-hidden">
            <img alt="Avatar" className="inline-block h-10 w-10 rounded-full ring-2 ring-surface-container-lowest" src="https://lh3.googleusercontent.com/aida/AP1WRLu2Udb_iMCesP5gpMxiEwmmKKWdEAOiNzpyuwAnAPXttOrbdox9_LeAfwpYCpmAm-94ddJtKX9Hj94YW8uJ9moephVxSEo8aooSPyk1VsfRksmE5S81ucpT1fuLOq6uJJU0uLGfPEZh_QD-hvn1xZKkKgfvbYnzKbt9EpkIsww_mMVuKBDVhPnnpujgpCjustA2wqNNwngrJUL_kXoz9iKXNzoXq86LURTIWQWX_93ydTbYY4tmDOgrErzX" />
            <img alt="Avatar" className="inline-block h-10 w-10 rounded-full ring-2 ring-surface-container-lowest" src="https://lh3.googleusercontent.com/aida/AP1WRLsgK0k-knL1T7TPlEKTHMtoYXKL7Z9EEL2cCnkZuKXualcsmnnXKqm5XIR1vZxLoSzblSlCPAzpDztGZJgAGKhDjDMIQQ3kg-NVypdr1Qyme2siYPuEifAb0QE6K5p7uKJRjVpKai-zJZdU7RMK5TxO_4pDoUlDfHD-HrWQYO3bxFbJq0KaDYtgB5lYnBnRYF2ykcv_bGEkdp9xni_pB-2xD_5dQiit53_l1SdrLhoiZ2Y0CTVTFsG4OIjm" />
            <img alt="Avatar" className="inline-block h-10 w-10 rounded-full ring-2 ring-surface-container-lowest" src="https://lh3.googleusercontent.com/aida/AP1WRLskAuGu8u8OhRbfJHC-1qgpQPNxss0k4Cgdcu-uAw8rP13N50T9DCTBW741sQUwUG0Rm7sdl5QTXgdimiCkwxqhx00OOblBbs9FPuN6kFPD9LJzVNJJic7S2OR55EqfKJEE5IiP4PkXNq_nr997XYERaItc4C5TL-Y6snBl7KfQE9F0ilUjLIeYEhvQfUzx8AeKVV95H5-KOOgt-Gs7thIYdaEva6x9lVkFClDNOzNtikhjZpwt8E8gw73a" />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high ring-2 ring-surface-container-lowest text-xs font-bold text-on-surface-variant">+9</div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-md ambient-shadow flex justify-between items-center border-l-4 border-tertiary">
          <div>
            <h3 className="text-label-sm font-bold text-outline-variant uppercase tracking-widest mb-1">Not in yet today</h3>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-extrabold text-tertiary">05</span>
              <span className="text-on-surface-variant text-sm mb-1 font-medium">Expected by 10:00 AM</span>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="material-symbols-outlined text-tertiary opacity-20 text-5xl">schedule</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-surface-container-low p-6 rounded-md hover:bg-surface-container-high transition-colors group">
          <p className="text-label-sm font-bold text-on-surface-variant mb-2">ON TIME TODAY</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-on-background group-hover:text-primary transition-colors">384</span>
            <span className="text-xs text-secondary font-bold flex items-center"><span className="material-symbols-outlined text-xs">trending_up</span> 4%</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-md hover:bg-surface-container-high transition-colors group">
          <p className="text-label-sm font-bold text-on-surface-variant mb-2">LATE ARRIVALS TODAY</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-on-background group-hover:text-error transition-colors">27</span>
            <span className="text-xs text-error font-bold flex items-center"><span className="material-symbols-outlined text-xs">trending_up</span> 12%</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-md hover:bg-surface-container-high transition-colors group">
          <p className="text-label-sm font-bold text-on-surface-variant mb-2">WFH / ON DUTY</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-on-background group-hover:text-primary transition-colors">42</span>
            <span className="text-xs text-on-surface-variant font-medium">Active now</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-md hover:bg-surface-container-high transition-colors group">
          <p className="text-label-sm font-bold text-on-surface-variant mb-2">REMOTE CLOCK-INS</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-on-background group-hover:text-primary transition-colors">156</span>
            <span className="text-xs text-on-surface-variant font-medium">Verified</span>
          </div>
        </div>
      </div>

      {/* Team Calendar Section */}
      <div className="bg-surface-container-lowest rounded-md ambient-shadow overflow-hidden mb-12">
        <div className="p-8 flex items-center justify-between">
          <h2 className="text-headline-sm font-bold text-on-background">Team Calendar</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
            <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
        <div className="overflow-x-auto hide-scrollbar px-8 pb-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-label-sm font-bold text-outline border-b border-surface-container-high">
                <th className="pb-4 pr-6 min-w-[200px]">NAME</th>
                {days.map((d) => (
                  <th key={d} className="pb-4 px-1 text-center w-8 font-medium">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-body-md text-on-surface">
              {people.map((person) => (
                <tr key={person.name} className="group border-b border-surface-container-low hover:bg-surface-container-lowest transition-colors">
                  <td className="py-4 pr-6 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary-fixed flex items-center justify-center text-xs font-bold text-primary">{person.initials}</div>
                    <span className="font-semibold">{person.name}</span>
                  </td>
                  {days.map((d) => (
                    <td key={d} className="py-4 px-1 text-center"><div className={`w-3 h-3 rounded-full mx-auto ${statusClass(d, person.variant)}`}></div></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-6 bg-surface-container-low flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant">
            <div className="w-2 h-2 rounded-full bg-secondary-container"></div> PRESENT
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant">
            <div className="w-2 h-2 rounded-full bg-primary-fixed"></div> ON DUTY
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant">
            <div className="w-2 h-2 rounded-full bg-error-container"></div> PAID LEAVE
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant">
            <div className="w-2 h-2 rounded-full bg-tertiary-container"></div> HOLIDAY
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant">
            <div className="w-2 h-2 rounded-full bg-surface-container-high"></div> WEEKEND
          </div>
        </div>
      </div>

      {/* Peers Section */}
      <div>
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-headline-sm font-bold text-on-background">Peers (12)</h2>
          <button className="text-primary font-bold text-sm hover:underline">View All Team</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Peer cards - static examples */}
          <div className="bg-surface-container-lowest p-6 rounded-md ambient-shadow hover:translate-y-[-4px] transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-16 w-16 bg-primary opacity-0 group-hover:opacity-5 transition-opacity" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }} />
            <div className="flex items-start gap-5">
              <img alt="Sarah Chen" className="h-16 w-16 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida/AP1WRLuLIm63Fg57HVu0C-xj9rlovUNFvNGBBNJIFMvgcw3vOuH2zkK2lTb1Xsq1_s-KOvzamrbG7rp8Cq2svhLExx0PXvnH0xQibL6V6lYmgabStr3EPXXzBdZsfJSUW-xifSu4JSEecXhVj9G1hwJ6b7SXlbpaIKhhLjFpaiuPRMMz33c9rPOJJ-Ug3CrUvFEUOPmhCESH3oZ_5MBGJ2XBKrUBJIz2BHnu441G6gqWFxRN4nT7K05qC7Q4m6U7" />
              <div className="flex-1">
                <h3 className="font-bold text-on-background text-lg leading-tight">Sarah Chen</h3>
                <p className="text-primary text-xs font-bold uppercase tracking-wider mb-4">Senior Product Designer</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    San Francisco, CA
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                    <span className="material-symbols-outlined text-sm">hub</span>
                    Product &amp; Design
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-surface-container-low flex items-center justify-between">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">mail</span>
                <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">call</span>
              </div>
              <button className="text-xs font-bold bg-surface-container-high px-3 py-1 rounded-full text-on-surface-variant hover:bg-primary-fixed hover:text-primary transition-colors">Profile</button>
            </div>
          </div>

          {/* Two more example peer cards (Michael, Aisha) */}
          <div className="bg-surface-container-lowest p-6 rounded-md ambient-shadow hover:translate-y-[-4px] transition-all duration-300 relative overflow-hidden group">
            <div className="flex items-start gap-5">
              <img alt="Michael Rivera" className="h-16 w-16 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida/AP1WRLsVvB9AFelk9v-upHi3evWk_VKBhuElzoLe4yMTMX6cIyKoZmFnjES1_t1SBbu8aFcfRSQ_gL4B67Zfza87NjB9cgmlqNlmVeyc7Y4VOL3TbHJ7FesRUpYD8Ek_4qF1BvZ7f4TyFVfTl9O8e9JjazqzGNRGOEvc6b7aDiwNUkWwmlVHCrQL5jR_Z1NEglbcCL2fn20RYqGT68fnKYgc1DR6x6dD60sty6K7LUTE0thu72YbcBWXpIxbYCfH" />
              <div className="flex-1">
                <h3 className="font-bold text-on-background text-lg leading-tight">Michael Rivera</h3>
                <p className="text-primary text-xs font-bold uppercase tracking-wider mb-4">Lead Software Engineer</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    Austin, TX
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                    <span className="material-symbols-outlined text-sm">hub</span>
                    Core Infrastructure
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-surface-container-low flex items-center justify-between">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">mail</span>
                <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">call</span>
              </div>
              <button className="text-xs font-bold bg-surface-container-high px-3 py-1 rounded-full text-on-surface-variant hover:bg-primary-fixed hover:text-primary transition-colors">Profile</button>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-md ambient-shadow hover:translate-y-[-4px] transition-all duration-300 relative overflow-hidden group">
            <div className="flex items-start gap-5">
              <img alt="Aisha Gupta" className="h-16 w-16 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida/AP1WRLvh5p-Ly8t5_pAx7WGFY9mavShTHtCiD_3XEnHYUZ1ff4z9hLpkW1zbnI_XLV-gWQjft75d__Uc82ueOfH2JMXVbhZWu3YOnCS01OeiSZ65sy1e2JR03Bn6LiXgsx5kNUfgO19uughqH2TAbkUKvNPjvcR6Dw2fZhhdNPUEzGf9k2OefEBl5xs744Snl4wqSLkPYJkN1iGsFPJQ0kbyWTcg18QkSo5ibNmj0jRIGtiEEvjo6s2B_TgZ_7I" />
              <div className="flex-1">
                <h3 className="font-bold text-on-background text-lg leading-tight">Aisha Gupta</h3>
                <p className="text-primary text-xs font-bold uppercase tracking-wider mb-4">Talent Acquisition</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    London, UK
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                    <span className="material-symbols-outlined text-sm">hub</span>
                    People Operations
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-surface-container-low flex items-center justify-between">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">mail</span>
                <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">call</span>
              </div>
              <button className="text-xs font-bold bg-surface-container-high px-3 py-1 rounded-full text-on-surface-variant hover:bg-primary-fixed hover:text-primary transition-colors">Profile</button>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual FAB */}
      <button className="fixed bottom-8 right-8 h-14 w-14 rounded-full gradient-primary text-on-primary ambient-shadow flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>
    </div>
  );
}
