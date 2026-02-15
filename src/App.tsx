import { AnimatePresence, motion, MotionConfig, type Transition } from "motion/react";
import { useState } from "react";

const AVATARS = [
    { id: 1, src: "avatar-list/avatars/11.svg", name: "Alayna", status: "online", bio: "Frontend Dev" },
    { id: 2, src: "avatar-list/avatars/2.svg", name: "Alex", status: "idle", bio: "Backend Dev" },
    { id: 3, src: "avatar-list/avatars/3.svg", name: "Henry", status: "online", bio: "Graphic Artist" },
    { id: 4, src: "avatar-list/avatars/4.svg", name: "Alicia", status: "dnd", bio: "Frontend Dev" },
    { id: 5, src: "avatar-list/avatars/5.svg", name: "Mel", status: "idle", bio: "Sr. Intern" },
    { id: 6, src: "avatar-list/avatars/6.svg", name: "Sasha", status: "online", bio: "Backend Dev" },
    { id: 7, src: "avatar-list/avatars/7.svg", name: "John", status: "online", bio: "Social Lead" },
    { id: 8, src: "avatar-list/avatars/8.svg", name: "Cristi", status: "offline", bio: "Copywriter" },
    { id: 9, src: "avatar-list/avatars/9.svg", name: "Morika", status: "dnd", bio: "Social Lead" },
    { id: 10, src: "avatar-list/avatars/10.svg", name: "Lenny", status: "offline", bio: "Designer" }
].sort((a, b) => a.name.localeCompare(b.name));

const iOSSpring: Transition = {
    type: "spring",
    stiffness: 350,
    damping: 27,
    mass: 1
};

function FloatingControls({
    isHovered,
    isReversed,
    state,
    setState,
    toggleReverse
}: {
    isHovered: boolean;
    isReversed: boolean;
    state: string;
    setState: (s: "row" | "column" | "card") => void;
    toggleReverse: () => void;
}) {
    const toggleLayout = () => {
        if (state === "row") {
            setState("column");
        } else if (state === "column") {
            setState("row");
        }
    };

    return (
        <AnimatePresence>
            {state !== "card" && (
                <motion.div
                    key="floating-controls"
                    layout
                    initial={{ opacity: 0, padding: 0, gap: "0.25rem", filter: "blur(5px)" }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        padding: isHovered ? "0.625rem 1.25rem" : 0,
                        gap: isHovered ? "1rem" : "0.25rem",
                        filter: isHovered ? "blur(0px)" : "blur(5px)"
                    }}
                    exit={{ opacity: 0, padding: 0, gap: "0.25rem", filter: "blur(5px)" }}
                    className={`absolute ${isReversed ? "bottom-0 translate-y-1/2" : "top-0 -translate-y-1/2"} left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full border border-black/15 bg-white/50 px-0 py-0 opacity-0 shadow-md shadow-black/10 backdrop-blur-md`}
                >
                    <motion.button
                        layout
                        // md:h-8 md:w-8 | md:h-4 md:w-8
                        className={`${state === "column" ? "h-4 w-4 md:h-6 md:w-6" : "h-3 w-6 md:h-4 md:w-8"} cursor-pointer rounded-sm border-2 border-black/25 transition-all duration-200 hover:border-transparent hover:bg-black/40`}
                        onClick={toggleLayout}
                    />
                    <motion.button
                        layout
                        className={`h-4 w-4 cursor-pointer rounded-full transition-colors duration-200 md:h-6 md:w-6 ${isReversed ? "bg-black" : "border-2 border-black/25 hover:border-transparent hover:bg-black/40"}`}
                        onClick={() => toggleReverse()}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function List({
    reverse,
    setState,
    isColumn
}: {
    reverse?: boolean;
    setState: (state: "row" | "column" | "card") => void;
    isColumn: boolean;
}) {
    return (
        <motion.div
            key="list"
            layout
            layoutId="morph-container"
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
            className={`relative flex w-80 md:w-lg lg:w-2xl ${reverse ? "flex-col-reverse" : "flex-col"} items-center gap-4 overflow-hidden rounded-3xl border border-black/20 bg-white p-1 md:p-2 lg:p-2.5`}
            style={{ boxShadow: "inset 0 5px 5px #F8F8F8, inset 0 -1px 2px #D2D7DB" }}
        >
            <motion.div layout className="flex w-full justify-between">
                <motion.div layout className={`${reverse ? "mb-2" : "mt-2"} ml-1.5 flex items-center gap-2`}>
                    <motion.img
                        layout
                        draggable={false}
                        className="size-12 rounded-full select-none md:size-24 lg:size-28"
                        src="avatar-list/avatars/1.svg"
                    />
                    <motion.div layout className="flex flex-col gap-0.5">
                        <motion.h1 layout className="md:text-lg lg:text-xl">
                            Octave Labs
                        </motion.h1>
                        <motion.p layout className="text-xs text-black/50 md:text-lg lg:text-xl">
                            100+ Connections
                        </motion.p>
                    </motion.div>
                </motion.div>

                <motion.div layout className="mr-2 flex items-center">
                    <motion.button
                        initial={{ translateX: "0.5rem" }}
                        animate={{ translateX: 0 }}
                        className="group -mr-0.5 w-fit cursor-pointer rounded-full border border-black/10 px-2.5 py-0.5 text-sm transition-colors duration-200 hover:bg-black hover:text-white md:text-base lg:text-lg"
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
                </motion.div>
            </motion.div>

            <motion.div
                key="list-content"
                layout
                initial={{ opacity: 0, translateX: "10rem" }}
                animate={{ opacity: 1, translateX: 0 }}
                className={`${isColumn ? "max-h-52 w-full flex-col overflow-y-scroll md:max-h-80" : "items-center overflow-x-scroll p-2"} relative z-10 flex gap-2 rounded-[22px] bg-black/4`}
            >
                {AVATARS.map((avatar, idx) => (
                    <motion.div
                        key={avatar.id}
                        initial="initial"
                        whileHover="hovered"
                        variants={{
                            initial: { backgroundColor: "#e2e6e9" },
                            hovered: { backgroundColor: !isColumn ? "#e2e6e9" : "#DCDEE1" }
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
                                className="size-12 select-none md:size-24 lg:size-28"
                                src={avatar.src}
                            />
                            <motion.div layout>
                                <div className="absolute right-0 -bottom-0.5 size-4 rounded-full bg-[#e5e8eb] md:size-8" />
                                <div
                                    className={`animate-flash absolute right-0 -bottom-0.5 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full md:size-4 ${avatar.status === "dnd" ? "bg-red-400" : avatar.status === "idle" ? "bg-yellow-400" : "bg-green-400"}`}
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
                                <motion.span layout className="text-sm font-medium md:text-lg lg:text-xl">
                                    {avatar.name}
                                </motion.span>
                                <motion.span layout className="text-xs text-black/50 md:text-base lg:text-lg">
                                    {avatar.bio}
                                </motion.span>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}

function Card({ reverse, setState }: { reverse?: boolean; setState: (state: "row" | "column" | "card") => void }) {
    const returnState = () => setState("row");

    return (
        <motion.div
            key="card"
            layout
            layoutId="morph-container"
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
            className={`flex w-64 md:w-80 lg:w-96 ${reverse ? "flex-col-reverse" : "flex-col"} overflow-hidden rounded-3xl border border-black/20 bg-white p-6 md:p-7 lg:p-7.5`}
            style={{ boxShadow: "inset 0 5px 5px #F8F8F8, inset 0 -1px 2px #D2D7DB" }}
        >
            <motion.button
                layout
                initial={{ translateX: "-0.5rem" }}
                animate={{ translateX: 0 }}
                className="group -mr-0.5 w-fit cursor-pointer rounded-full border border-black/10 px-2.5 py-0.5 text-sm transition-colors duration-200 hover:bg-black hover:text-white md:text-base lg:text-lg"
                onClick={returnState}
            >
                <motion.span className="ease-overshoot -mr-3 opacity-0 transition-all duration-300 group-hover:mr-1 group-hover:opacity-100">
                    {"<-"}
                </motion.span>
                Back
            </motion.button>

            <motion.div
                layout
                initial={{ translateY: "0.5rem" }}
                animate={{ translateY: 0 }}
                className={`${reverse ? "mb-4" : "mt-4"} flex flex-col gap-3 md:text-lg lg:text-xl`}
            >
                <motion.span layout>
                    Coded <br />{" "}
                    <a
                        href="https://x.com/@bygunique"
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-pointer text-indigo-400 hover:brightness-50"
                    >
                        @bygunique
                    </a>
                </motion.span>
                <motion.span layout>
                    Inspired by <br />{" "}
                    <a
                        href="https://x.com/@bossadizenith"
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-pointer text-indigo-400 hover:brightness-50"
                    >
                        @bossadizenith
                    </a>
                    <br />
                    <a
                        href="https://x.com/@t_bekkers"
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-pointer text-indigo-400 hover:brightness-50"
                    >
                        @t_bekkers
                    </a>
                </motion.span>
            </motion.div>
        </motion.div>
    );
}

export default function App() {
    const [state, setState] = useState<"row" | "column" | "card">("row");
    const [isHovered, setIsHovered] = useState(false);
    const [isReversed, setIsReversed] = useState(false);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <MotionConfig transition={iOSSpring}>
                <motion.div
                    animate={{ translateY: isHovered ? "0.15rem" : 0 }}
                    transition={{ ...iOSSpring, damping: 15, stiffness: 400 }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative"
                >
                    <FloatingControls
                        isHovered={isHovered}
                        isReversed={isReversed}
                        state={state}
                        setState={setState}
                        toggleReverse={() => setIsReversed(prev => !prev)}
                    />

                    <div className="grid grid-cols-1 grid-rows-1 items-center justify-items-center">
                        <AnimatePresence mode="popLayout">
                            {state === "card" ? (
                                <div key="card-wrapper" className="col-start-1 row-start-1">
                                    <Card reverse={isReversed} setState={setState} />
                                </div>
                            ) : (
                                <div key="list-wrapper" className="col-start-1 row-start-1">
                                    <List reverse={isReversed} setState={setState} isColumn={state === "column"} />
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </MotionConfig>
        </div>
    );
}
