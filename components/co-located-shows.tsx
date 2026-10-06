"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { Container } from "@/components/ui/Container";

/* =========================================================
   Types
   ========================================================= */

type PartnerLogo = {
  src: string;
  url: string;
  name: string;
  imgClassName?: string;
};

type PartnerGroup = {
  label: string;
  logos: PartnerLogo[];
};

/* =========================================================
   Featured Partners — Row 1
   ========================================================= */

const row1: PartnerGroup[] = [
  {
    label: "Platinum Partner",
    logos: [
      {
        src: "/partners/eka.png",
        url: "#",
        name: "Platinum Partner",
        imgClassName: "max-h-14",
      },
    ],
  },
  {
    label: "Masma Pavilion",
    logos: [
      {
        src: "/partners/masma.webp",
        url: "https://www.youhonk.com/",
        name: "Masma Pavilion",
        imgClassName: "max-h-14",
      },
    ],
  },
  {
    label: "Co-Partner",
    logos: [
      {
        src: "/partners/youhonk.png",
        url: "https://www.youhonk.com/",
        name: "Co-Partner",
        imgClassName: "max-h-14",
      },
    ],
  },
  {
    label: "E-Mobility Partner",
    logos: [
      {
        src: "/partners/garve-hyundai.png",
        url: "https://garve.hyundaimotor.in/",
        name: "E-Mobility Partner",
        imgClassName: "max-h-12",
      },
    ],
  },
  {
    label: "Four Wheeler Partner",
    logos: [
      {
        src: "/partners/toyota.png",
        url: "https://www.toyotabharat.com/",
        name: "Four Wheeler Partner",
        imgClassName: "max-h-10",
      },
    ],
  },
];

/* =========================================================
   Featured Partners — Row 2
   ========================================================= */

const row2: PartnerGroup[] = [
  {
    label: "Two Wheeler Partner",
    logos: [
      {
        src: "/partners/kinet.jpeg",
        url: "https://kineticev.in/",
        name: "Two Wheeler Partner",
        imgClassName: "max-h-10",
      },
    ],
  },
  {
    label: "Battery Partner",
    logos: [
      {
        src: "/partners/Redon-logo-2.png",
        url: "#",
        name: "Battery Partner",
        imgClassName: "max-h-10",
      },
    ],
  },
  {
    label: "Institutional Partner",
    logos: [
      {
        src: "/partners/institutional.png",
        url: "https://www.asrtu.org/",
        name: "Institutional Partner 1",
        imgClassName: "max-h-9",
      },
      {
        src: "/partners/RVSF_logo_new.webp",
        url: "https://rvsfindia.in/",
        name: "Institutional Partner 2",
        imgClassName: "max-h-9",
      },
    ],
  },
  {
    label: "Battery Testing Partner",
    logos: [
      {
        src: "/partners/Bind.jpg",
        url: "https://www.binder-world.com/int-en",
        name: "Battery Testing Partner",
        imgClassName: "max-h-10",
      },
    ],
  },
];

/* =========================================================
   Featured Partners — Row 3
   ========================================================= */

const row3: PartnerGroup[] = [
  {
    label: "Supporting Partners",
    logos: [
      {
        src: "/partners/supporting.png",
        url: "#",
        name: "Supporting Partner 1",
        imgClassName: "max-h-9",
      },
      {
        src: "/partners/bis-logo.png",
        url: "#",
        name: "Supporting Partner 2",
        imgClassName: "max-h-9",
      },
    ],
  },
  {
    label: "Startup Ecosystem Partner",
    logos: [
      {
        src: "/partners/hub.png",
        url: "https://ihubgujarat.in/",
        name: "Startup Ecosystem Partner",
        imgClassName: "max-h-10",
      },
    ],
  },
  {
    label: "Strategy Partner",
    logos: [
      {
        src: "/partners/Theistic.png",
        url: "https://theistic.in/",
        name: "Strategy Partner",
        imgClassName: "max-h-10",
      },
    ],
  },
  {
    label: "Startup Partner",
    logos: [
      {
        src: "/partners/Wespark.png",
        url: "https://wespark.org.in/",
        name: "Startup Partner",
        imgClassName: "max-h-12",
      },
    ],
  },
];

/* =========================================================
   Knowledge Partners
   ========================================================= */

const knowledgePartners: PartnerLogo[] = [
  {
    src: "/partners/ifeva.png",
    url: "https://fevaev.com/",
    name: "Knowledge Partner 1",
    imgClassName: "max-h-16",
  },
  {
    src: "/partners/knowledge-part.png",
    url: "#",
    name: "Knowledge Partner 2",
    imgClassName: "max-h-16",
  },
  {
    src: "/partners/fronst-sullivan-1.png",
    url: "#",
    name: "Knowledge Partner 3",
    imgClassName: "max-h-16",
  },
];

/* =========================================================
   Supporting Associations
   ========================================================= */

const supportingAssociations: PartnerLogo[] = [
  {
    src: "/partners/logo-1.jpg",
    url: "https://www.araiindia.com/",
    name: "Association 1",
    imgClassName: "max-h-11",
  },
  {
    src: "/partners/ace.png",
    url: "#",
    name: "Association 2",
    imgClassName: "max-h-11",
  },
  {
    src: "/partners/logo-4.jpg",
    url: "https://indiaesa.info/",
    name: "Association 3",
    imgClassName: "max-h-11",
  },
  {
    src: "/partners/logo-3.jpg",
    url: "https://smartemobility.org/",
    name: "Association 4",
    imgClassName: "max-h-14",
  },
  {
    src: "/partners/aisia.png",
    url: "https://aisia.org.in/",
    name: "Association 5",
    imgClassName: "max-h-11",
  },
  {
    src: "/partners/rsa.png",
    url: "#",
    name: "Association 6",
    imgClassName: "max-h-12",
  },
  {
    src: "/partners/NETRA.jpeg",
    url: "https://netraglobal.org/",
    name: "Association 7",
    imgClassName: "max-h-11",
  },
  {
    src: "/partners/ibsa.png",
    url: "https://ibsa.org.in/",
    name: "Association 8",
    imgClassName: "max-h-11",
  },
  {
    src: "/partners/logo-5.jpg",
    url: "#",
    name: "Association 9",
    imgClassName: "max-h-11",
  },
];

/* =========================================================
   Official Media Partners
   ========================================================= */

const officialMediaLogos: PartnerLogo[] = [
  {
    src: "/partners/logo-6.jpg",
    url: "https://www.auto-innovations.net/",
    name: "Official Media Partner 1",
    imgClassName: "max-h-12",
  },
  {
    src: "/partners/logo-7.jpg",
    url: "https://induportals-media-publishing.com/",
    name: "Official Media Partner 2",
    imgClassName: "max-h-12",
  },
];

/* =========================================================
   Media Partners
   ========================================================= */

const mediaPartners: PartnerLogo[] = [
  {
    src: "/partners/urja-daily.png",
    url: "#",
    name: "Media 1",
    imgClassName: "max-h-12",
  },
  {
    src: "/partners/electronics-era.png",
    url: "#",
    name: "Media 2",
    imgClassName: "max-h-12",
  },
  {
    src: "/partners/ev-mechanica.png",
    url: "#",
    name: "Media 3",
    imgClassName: "max-h-12",
  },
  {
    src: "/partners/battery-magazine.png",
    url: "#",
    name: "Media 4",
    imgClassName: "max-h-12",
  },
  {
    src: "/partners/cosmoworld.png",
    url: "#",
    name: "Media 5",
    imgClassName: "max-h-12",
  },
  {
    src: "/partners/engineer.png",
    url: "#",
    name: "Media 6",
    imgClassName: "max-h-8",
  },
  {
    src: "/partners/trade-fair-times.png",
    url: "#",
    name: "Media 7",
    imgClassName: "max-h-12",
  },
  {
    src: "/partners/evolution.png",
    url: "#",
    name: "Media 8",
    imgClassName: "max-h-12",
  },
  {
    src: "/partners/99-media-group.png",
    url: "#",
    name: "Media 9",
    imgClassName: "max-h-12",
  },
  {
    src: "/partners/ev-tech-news.png",
    url: "#",
    name: "Media 10",
    imgClassName: "max-h-12",
  },
  {
    src: "/partners/er-city.png",
    url: "#",
    name: "Media 11",
    imgClassName: "max-h-12",
  },
  {
    src: "/partners/auto-ev-times.png",
    url: "#",
    name: "Media 12",
    imgClassName: "max-h-12",
  },
  {
    src: "/partners/smart-energy.png",
    url: "#",
    name: "Media 13",
    imgClassName: "max-h-12",
  },
];

/* =========================================================
   Motion
   ========================================================= */

const EASE = [0.16, 1, 0.3, 1] as const;

const groupVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.04,
    },
  },
};

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.54,
      ease: EASE,
    },
  },
};

/* =========================================================
   Background
   ========================================================= */

function PartnersBackground({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        -z-10
        overflow-hidden
      "
    >
      {/* Blue glow */}

      <div
        className="
          absolute
          -left-60
          top-[20%]
          size-[36rem]
          rounded-full
          bg-blue/[0.04]
          blur-[130px]
        "
      />

      {/* Solar glow */}

      <div
        className="
          absolute
          -right-52
          top-10
          size-[30rem]
          rounded-full
          bg-solar/[0.065]
          blur-[115px]
        "
      />

      {/* Main animated solar geometry */}

      <motion.svg
        viewBox="0 0 900 900"
        fill="none"
        className="
          absolute
          -right-[350px]
          -top-[350px]
          size-[820px]
          text-blue
          opacity-[0.035]

          sm:-right-[290px]
          sm:size-[900px]

          lg:-right-[220px]
          lg:size-[1040px]
        "
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 130,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <circle
          cx="450"
          cy="450"
          r="145"
          stroke="currentColor"
        />

        <circle
          cx="450"
          cy="450"
          r="235"
          stroke="currentColor"
          strokeDasharray="4 16"
        />

        <circle
          cx="450"
          cy="450"
          r="345"
          stroke="currentColor"
        />

        <path
          d="M450 30V870"
          stroke="currentColor"
        />

        <path
          d="M30 450H870"
          stroke="currentColor"
        />

        <path
          d="M153 153L747 747"
          stroke="currentColor"
        />

        <path
          d="M747 153L153 747"
          stroke="currentColor"
        />

        <circle
          cx="450"
          cy="450"
          r="8"
          fill="#fbb216"
          stroke="none"
        />
      </motion.svg>

      {/* Secondary opposite rotating geometry */}

      <motion.svg
        viewBox="0 0 420 420"
        fill="none"
        className="
          absolute
          -bottom-36
          -left-36
          hidden
          size-[460px]
          text-solar
          opacity-[0.035]

          lg:block
        "
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: -360,
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 165,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <circle
          cx="210"
          cy="210"
          r="90"
          stroke="currentColor"
        />

        <circle
          cx="210"
          cy="210"
          r="150"
          stroke="currentColor"
          strokeDasharray="3 13"
        />

        <circle
          cx="210"
          cy="210"
          r="195"
          stroke="currentColor"
        />

        <path
          d="M210 20V400"
          stroke="currentColor"
        />

        <path
          d="M20 210H400"
          stroke="currentColor"
        />
      </motion.svg>
    </div>
  );
}

/* =========================================================
   Main Section
   ========================================================= */

export function CoLocatedShows() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="
        relative
        isolate
        overflow-hidden
        bg-paper
        text-ink
      "
    >
      <PartnersBackground reduceMotion={reduceMotion} />

      <Container
        size="wide"
        className="
          relative
          py-16
          sm:py-20
          lg:py-24
        "
      >
        {/* =================================================
            Header
            ================================================= */}

        <motion.div
          variants={groupVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
            margin: "-40px",
          }}
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >
          <motion.div
            variants={revealVariants}
            className="
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-7
                bg-solar
              "
            />

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-blue

                sm:text-[11px]
              "
            >
              Event Partners &amp; Associations
            </span>

            <span
              aria-hidden="true"
              className="
                h-px
                w-7
                bg-solar
              "
            />
          </motion.div>

          <motion.h2
            variants={revealVariants}
            id="partners-heading"
            className="
              mt-4
              font-display
              text-[clamp(2.2rem,3.5vw,3.7rem)]
              font-semibold
              leading-[0.98]
              tracking-[-0.035em]
              text-ink
            "
          >
            Our Powerful{" "}
            <span className="text-blue">
              Ecosystem
            </span>
          </motion.h2>

          <motion.p
            variants={revealVariants}
            className="
              mx-auto
              mt-5
              max-w-xl
              text-sm
              leading-7
              text-ink/52

              sm:text-[15px]
            "
          >
            A connected network of industry partners, associations,
            institutions, and media platforms supporting the show ecosystem.
          </motion.p>

          <motion.div
            variants={revealVariants}
            className="
              mt-5
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span
              className="
                size-1.5
                rounded-full
                bg-solar
              "
            />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-ink/32

                sm:text-[10px]
              "
            >
              Industry backed · Ecosystem driven
            </span>
          </motion.div>
        </motion.div>

        {/* Main divider */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  scaleX: 0,
                }
          }
          whileInView={{
            scaleX: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.9,
            ease: EASE,
          }}
          className="
            mt-10
            h-px
            origin-center
            bg-ink/[0.08]

            lg:mt-12
          "
        />

        {/* =================================================
            Featured Partners
            ================================================= */}

        <div
          className="
            mt-8
            space-y-3

            lg:mt-10
          "
        >
          <PartnerRow
            items={row1}
            columns="lg:grid-cols-5"
            reduceMotion={reduceMotion}
          />

          <PartnerRow
            items={row2}
            columns="lg:grid-cols-4"
            reduceMotion={reduceMotion}
          />

          <PartnerRow
            items={row3}
            columns="lg:grid-cols-4"
            reduceMotion={reduceMotion}
          />
        </div>

        {/* =================================================
            Other Partner Groups
            ================================================= */}

        <div
          className="
            mt-16
            space-y-14

            lg:mt-20
            lg:space-y-16
          "
        >
          <PartnerCollection
            title="Knowledge Partners"
            items={knowledgePartners}
            columns="sm:grid-cols-3"
            maxWidth="max-w-3xl"
            reduceMotion={reduceMotion}
          />

          <PartnerCollection
            title="Supporting Associations"
            items={supportingAssociations}
            columns="
              grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-5
            "
            maxWidth="max-w-5xl"
            reduceMotion={reduceMotion}
          />

          <PartnerCollection
            title="Official Media Partners"
            items={officialMediaLogos}
            columns="grid-cols-2"
            maxWidth="max-w-xl"
            reduceMotion={reduceMotion}
          />

          <MediaPartners
            items={mediaPartners}
            reduceMotion={reduceMotion}
          />
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   Partner Row
   ========================================================= */

function PartnerRow({
  items,
  columns,
  reduceMotion,
}: {
  items: PartnerGroup[];
  columns: string;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      variants={groupVariants}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.08,
        margin: "-30px",
      }}
      className={`
        grid
        grid-cols-1
        gap-3

        sm:grid-cols-2

        ${columns}
      `}
    >
      {items.map((item) => (
        <motion.div
          key={item.label}
          variants={revealVariants}
          className="h-full"
        >
          <PartnerCard
            label={item.label}
            logos={item.logos}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

/* =========================================================
   Featured Partner Card
   ========================================================= */

function PartnerCard({
  label,
  logos,
}: PartnerGroup) {
  return (
    <article
      className="
        group
        relative
        flex
        h-[142px]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-ink/[0.08]
        bg-paper/90
        px-4
        py-4

        shadow-[0_7px_24px_rgba(25,25,25,0.025)]
        backdrop-blur-sm

        transition-[transform,border-color,box-shadow]
        duration-300
        ease-out

        hover:-translate-y-0.5
        hover:border-blue/20
        hover:shadow-[0_13px_34px_rgba(25,25,25,0.05)]

        sm:h-[150px]
      "
    >
      {/* Top accent */}

      <span
        aria-hidden="true"
        className="
          absolute
          left-0
          top-0
          h-[2px]
          w-0
          bg-solar

          transition-[width]
          duration-500
          ease-out

          group-hover:w-full
        "
      />

      {/* Label */}

      <div
        className="
          flex
          min-h-7
          items-start
          justify-center
        "
      >
        <h3
          className="
            max-w-[200px]
            text-center
            text-[9px]
            font-semibold
            uppercase
            leading-4
            tracking-[0.13em]
            text-ink/38
          "
        >
          {label}
        </h3>
      </div>

      {/* Logo area */}

      <div
        className="
          mt-2
          flex
          min-h-0
          flex-1
          items-center
          justify-center
        "
      >
        <div
          className="
            flex
            w-full
            items-center
            justify-center
            gap-4
          "
        >
          {logos.map((item) => (
            <PartnerLogoLink
              key={item.name}
              item={item}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   Featured Logo
   ========================================================= */

function PartnerLogoLink({
  item,
}: {
  item: PartnerLogo;
}) {
  const external = item.url !== "#";

  const logo = (
    <img
      src={item.src}
      alt={item.name}
      loading="lazy"
      draggable={false}
      className="
        block
        h-auto
        max-h-[50px]
        w-auto
        max-w-[88%]
        object-contain
        object-center

        transition-transform
        duration-300
        ease-out

        group-hover/logo:scale-[1.02]
      "
    />
  );

  if (!external) {
    return (
      <div
        className="
          group/logo
          flex
          min-w-0
          flex-1
          items-center
          justify-center
        "
      >
        {logo}
      </div>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.name}
      className="
        group/logo
        flex
        min-w-0
        flex-1
        items-center
        justify-center
        rounded-lg
      "
    >
      {logo}
    </a>
  );
}

/* =========================================================
   Partner Collection
   ========================================================= */

function PartnerCollection({
  title,
  items,
  columns,
  maxWidth = "max-w-5xl",
  reduceMotion,
}: {
  title: string;
  items: PartnerLogo[];
  columns: string;
  maxWidth?: string;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.section
      variants={groupVariants}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.08,
        margin: "-40px",
      }}
    >
      {/* Centered title */}

      <motion.div
        variants={revealVariants}
        className="
          text-center
        "
      >
        <div
          className="
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span
            aria-hidden="true"
            className="
              h-px
              w-6
              bg-solar
            "
          />

          <h3
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-blue

              sm:text-[11px]
            "
          >
            {title}
          </h3>

          <span
            aria-hidden="true"
            className="
              h-px
              w-6
              bg-solar
            "
          />
        </div>

       
      </motion.div>

      {/* Logo grid */}

      <motion.div
        variants={groupVariants}
        className={`
          mx-auto
          mt-5
          grid
          justify-center
          gap-3

          ${columns}
          ${maxWidth}
        `}
      >
        {items.map((item) => (
          <motion.div
            key={item.name}
            variants={revealVariants}
          >
            <LogoTile item={item} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

/* =========================================================
   Standard Logo Tile
   ========================================================= */

function LogoTile({
  item,
}: {
  item: PartnerLogo;
}) {
  const external = item.url !== "#";

  const content = (
    <>
      <img
        src={item.src}
        alt={item.name}
        loading="lazy"
        draggable={false}
        className="
          block
          h-auto
          max-h-[52px]
          w-auto
          max-w-[82%]
          object-contain
          object-center

          transition-transform
          duration-300
          ease-out

          group-hover:scale-[1.02]
        "
      />

      <span
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          bottom-0
          h-[2px]
          origin-center
          scale-x-0
          bg-solar

          transition-transform
          duration-500
          ease-out

          group-hover:scale-x-100
        "
      />
    </>
  );

  const className = `
    group
    relative
    flex
    h-[96px]
    w-full
    items-center
    justify-center
    overflow-hidden
    rounded-xl
    border
    border-ink/[0.08]
    bg-paper
    px-4
    py-4

    shadow-[0_6px_20px_rgba(25,25,25,0.022)]

    transition-[transform,border-color,box-shadow]
    duration-300
    ease-out

    hover:-translate-y-0.5
    hover:border-blue/20
    hover:shadow-[0_11px_28px_rgba(25,25,25,0.045)]

    sm:h-[102px]
  `;

  if (!external) {
    return (
      <div className={className}>
        {content}
      </div>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.name}
      className={className}
    >
      {content}
    </a>
  );
}

/* =========================================================
   Media Partners
   ========================================================= */

function MediaPartners({
  items,
}: {
  items: PartnerLogo[];
  reduceMotion?: boolean | null;
}) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 14,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.08,
        margin: "-40px",
      }}
      transition={{
        duration: 0.55,
        ease: EASE,
      }}
      className="
        relative
      "
    >
      {/* ===================================================
          Center heading
          =================================================== */}

      <div className="text-center">
        <div
          className="
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span
            aria-hidden="true"
            className="
              h-px
              w-6
              bg-solar
            "
          />

          <h3
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-blue

              sm:text-[11px]
            "
          >
            Media Partners
          </h3>

          <span
            aria-hidden="true"
            className="
              h-px
              w-6
              bg-solar
            "
          />
        </div>

       
      </div>

      {/* ===================================================
          Infinite marquee
          =================================================== */}

      <div
        className="
          relative
          mt-5
          w-full
          overflow-hidden
          rounded-2xl
          border
          border-ink/[0.08]
          bg-paper/80
          py-5
          shadow-[0_8px_32px_rgba(25,25,25,0.025)]
          backdrop-blur-sm

          sm:py-6
        "
      >
        {/* Left fade */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            z-20
            w-12

            bg-gradient-to-r
            from-paper
            via-paper/90
            to-transparent

            sm:w-20
            lg:w-28
          "
        />

        {/* Right fade */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            z-20
            w-12

            bg-gradient-to-l
            from-paper
            via-paper/90
            to-transparent

            sm:w-20
            lg:w-28
          "
        />

        {/* -------------------------------------------------
            IMPORTANT:
            2 identical tracks inside one moving wrapper.
            0% → -50% = continuous RIGHT TO LEFT.
            ------------------------------------------------- */}

        <motion.div
          className="
            flex
            w-max
            min-w-max
            flex-nowrap
            items-center
            will-change-transform
          "
          initial={{
            x: "0%",
          }}
          animate={{
            x: "-50%",
          }}
          transition={{
            duration: 42,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <MediaTrack
            items={items}
            prefix="primary"
          />

          <MediaTrack
            items={items}
            prefix="duplicate"
            duplicate
          />
        </motion.div>
      </div>
    </motion.section>
  );
}

/* =========================================================
   Media Track
   ========================================================= */

function MediaTrack({
  items,
  duplicate = false,
  prefix,
}: {
  items: PartnerLogo[];
  duplicate?: boolean;
  prefix: string;
}) {
  return (
    <div
      aria-hidden={duplicate ? true : undefined}
      className="
        flex
        shrink-0
        flex-nowrap
        items-center
        gap-3
        pr-3

        sm:gap-4
        sm:pr-4
      "
    >
      {items.map((item, index) => (
        <MediaLogo
          key={`${prefix}-${item.name}-${index}`}
          item={item}
          duplicate={duplicate}
        />
      ))}
    </div>
  );
}

/* =========================================================
   Media Logo
   ========================================================= */

function MediaLogo({
  item,
  duplicate,
}: {
  item: PartnerLogo;
  duplicate: boolean;
}) {
  const external =
    item.url !== "#" &&
    !duplicate;

  const logo = (
    <img
      src={item.src}
      alt={duplicate ? "" : item.name}
      loading="lazy"
      draggable={false}
      className="
        block
        h-auto
        max-h-[44px]
        w-auto
        max-w-[82%]
        select-none
        object-contain
        object-center

        transition-transform
        duration-300
        ease-out

        group-hover:scale-[1.025]

        sm:max-h-[46px]
      "
    />
  );

  const className = `
    group
    flex
    h-[82px]
    w-[145px]
    shrink-0
    items-center
    justify-center
    overflow-hidden
    rounded-xl
    border
    border-ink/[0.08]
    bg-paper
    px-4

    shadow-[0_5px_18px_rgba(25,25,25,0.02)]

    transition-[border-color,box-shadow]
    duration-300
    ease-out

    hover:border-blue/20
    hover:shadow-[0_9px_24px_rgba(25,25,25,0.04)]

    sm:h-[88px]
    sm:w-[160px]

    lg:w-[165px]
  `;

  if (!external) {
    return (
      <div className={className}>
        {logo}
      </div>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.name}
      className={className}
    >
      {logo}
    </a>
  );
}