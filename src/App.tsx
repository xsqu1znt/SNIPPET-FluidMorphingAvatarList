import { AnimatePresence, motion, MotionConfig, type Transition } from "motion/react";
import { useState } from "react";

const AVATARS = [
    { id: 1, src: "/avatars/11.svg", name: "Alayna", status: "online", bio: "Frontend Dev" },
    { id: 2, src: "/avatars/2.svg", name: "Alex", status: "idle", bio: "Backend Dev" },
    { id: 3, src: "/avatars/3.svg", name: "Henry", status: "online", bio: "Graphic Artist" },
    { id: 4, src: "/avatars/4.svg", name: "Alicia", status: "dnd", bio: "Frontend Dev" },
    { id: 5, src: "/avatars/5.svg", name: "Mel", status: "idle", bio: "Sr. Intern" },
    { id: 6, src: "/avatars/6.svg", name: "Sasha", status: "online", bio: "Backend Dev" },
    { id: 7, src: "/avatars/7.svg", name: "John", status: "online", bio: "Social Lead" },
    { id: 8, src: "/avatars/8.svg", name: "Cristi", status: "offline", bio: "Copywriter" },
    { id: 9, src: "/avatars/9.svg", name: "Morika", status: "dnd", bio: "Social Lead" },
    { id: 10, src: "/avatars/10.svg", name: "Lenny", status: "offline", bio: "Designer" }
].sort((a, b) => a.name.localeCompare(b.name));

const iOSSpring: Transition = {
    type: "spring",
    stiffness: 300,
    damping: 20,
    mass: 1
};

function List({
    state,
    setState,
    isColumn
}: {
    state: "row" | "column" | "card";
    setState: (state: "row" | "column" | "card") => void;
    isColumn: boolean;
}) {
    const [isHovered, setHover] = useState(false);

    return (
        <motion.div
            key="list"
            layout
            layoutId="morph-container"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            // exit={{ scale: 2 }}
            className="relative flex w-80 flex-col items-center gap-4 rounded-3xl border border-black/20 bg-white p-1"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* Header */}
            <motion.div layout className="flex w-full justify-between">
                {/* Header - Left */}
                <motion.div layout className="mt-2 ml-1.5 flex items-center gap-2">
                    <motion.img layout draggable={false} className="size-12 rounded-full select-none" src="/avatars/1.svg" />

                    <motion.div layout className="flex flex-col gap-0.5">
                        <motion.h1 layout className="">
                            Octave Labs
                        </motion.h1>
                        <motion.p layout className="text-xs text-black/50">
                            100+ Connections
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* Header - Right */}
                <motion.div layout className="mr-2 flex items-center">
                    {/* Button */}
                    <AnimatePresence mode="popLayout">
                        <motion.button
                            // layout
                            initial={{ translateX: "1.5rem" }}
                            animate={{ translateX: 0 }}
                            className="group -mr-0.5 w-fit cursor-pointer rounded-full border border-black/10 px-2.5 py-0.5 text-sm transition-colors duration-200 hover:bg-black hover:text-white"
                            onClick={() => setState("card")}
                        >
                            <motion.span
                                layout
                                className="ease-overshoot mr-1 transition-all duration-300 group-hover:mr-0 group-hover:opacity-0"
                            >
                                +
                            </motion.span>
                            Follow
                            <motion.span
                                layout
                                className="ease-overshoot -ml-3 opacity-0 transition-all duration-300 group-hover:ml-1 group-hover:opacity-100"
                            >
                                {"->"}
                            </motion.span>
                        </motion.button>
                    </AnimatePresence>
                </motion.div>
            </motion.div>

            {/* Avatars */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key="list-content"
                    layout
                    initial={{ opacity: 0, translateY: "-25%" }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: "-25%" }}
                    className={`${isColumn ? "max-h-52 w-full flex-col overflow-y-scroll" : "items-center overflow-x-scroll p-2"} relative flex gap-2 rounded-[22px] bg-black/4`}
                >
                    {AVATARS.map((avatar, idx) => (
                        <motion.div
                            layout
                            key={avatar.id}
                            animate="initial"
                            initial="initial"
                            whileHover="hovered"
                            variants={{
                                initial: { backgroundColor: "#e8ebee" },
                                hovered: { backgroundColor: !isColumn ? "#e8ebee" : "#DCDEE1" }
                            }}
                            className={`group flex shrink-0 items-center gap-2 rounded-[20px] ${isColumn ? "px-1 py-2" : ""}`}
                        >
                            <motion.div layout className="relative">
                                <motion.img
                                    layout
                                    draggable={false}
                                    variants={{
                                        initial: { rotate: 0, scale: 1 },
                                        hovered: { rotate: idx % 2 ? -10 : 10, scale: 1.05 }
                                    }}
                                    className="size-12 select-none"
                                    src={avatar.src}
                                />

                                {/* Status */}
                                <motion.div layout>
                                    <motion.div
                                        layout
                                        className={`absolute right-0 -bottom-0.5 size-4 rounded-full bg-[#e5e8eb]`}
                                    />
                                    <motion.div
                                        layout
                                        className={`animate-flash absolute right-0 -bottom-0.5 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${avatar.status === "dnd" ? "bg-red-400" : avatar.status === "idle" ? "bg-yellow-400" : "bg-green-400"}`}
                                        style={{ animationDelay: `${300 * idx}ms` }}
                                    />
                                </motion.div>
                            </motion.div>

                            {isColumn && (
                                <motion.div
                                    layout
                                    className="animate-fadeIn flex flex-col gap-0.5 opacity-0"
                                    style={{ animationDelay: `${100 * idx}ms` }}
                                >
                                    <motion.span layout className="text-sm font-medium">
                                        {avatar.name}
                                    </motion.span>
                                    <motion.span layout className="text-xs text-black/50">
                                        {avatar.bio}
                                    </motion.span>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Floating Controls */}
            <motion.div
                layout
                className={`ease-overshoot absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full border border-black/15 bg-white/50 px-0 py-0 opacity-0 backdrop-blur-md transition-all duration-300 ${isHovered ? "translate-y-1/2 gap-4 px-5 py-2.5 opacity-100 blur-none" : "translate-y-[calc(50%+1rem)] blur-xs"}`}
            >
                <motion.button
                    layout
                    className={`h-3 w-6 cursor-pointer rounded-sm transition-colors duration-200 ${state === "row" ? "bg-black" : "border-2 border-black/25 hover:border-transparent hover:bg-black/40"}`}
                    onClick={() => setState("row")}
                />
                <motion.button
                    layout
                    className={`h-6 w-4 cursor-pointer rounded-sm transition-colors duration-200 ${state === "column" ? "bg-black" : "border-2 border-black/25 hover:border-transparent hover:bg-black/40"}`}
                    onClick={() => setState("column")}
                />
            </motion.div>
        </motion.div>
    );
}

function Card({ setState }: { setState: (state: "row" | "column" | "card") => void }) {
    return (
        <motion.div
            key="card"
            layout
            layoutId="morph-container"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="flex w-80 flex-col gap-4 overflow-hidden rounded-2xl border border-black/20 bg-white p-6"
        >
            <motion.button
                // layout
                initial={{ translateX: "-1.5rem" }}
                animate={{ translateX: 0 }}
                className="group -mr-0.5 w-fit cursor-pointer rounded-full border border-black/10 px-2.5 py-0.5 text-sm transition-colors duration-200 hover:bg-black hover:text-white"
                onClick={() => setState("row")}
            >
                <motion.span
                    layout
                    className="ease-overshoot -mr-3 opacity-0 transition-all duration-300 group-hover:mr-1 group-hover:opacity-100"
                >
                    {"<-"}
                </motion.span>
                Back
            </motion.button>

            <motion.span layout>@guniqueg</motion.span>
        </motion.div>
    );
}

export default function App() {
    const [state, setState] = useState<"row" | "column" | "card">("row");

    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <MotionConfig transition={iOSSpring}>
                <AnimatePresence mode="wait">
                    {state === "card" ? (
                        <Card setState={setState} />
                    ) : (
                        <List state={state} setState={setState} isColumn={state === "column"} />
                    )}
                </AnimatePresence>
            </MotionConfig>
        </div>
    );
}
