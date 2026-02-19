import type { TargetAndTransition } from "motion/react"
import { motion } from "motion/react"

import { cn } from "../lib/utils"

const initialProps: TargetAndTransition = {
    pathLength: 0,
    opacity: 0,
}

const animateProps: TargetAndTransition = {
    pathLength: 1,
    opacity: 1,
}

type Props = React.ComponentProps<typeof motion.svg> & {
    speed?: number
    onAnimationComplete?: () => void
}

function AppleHelloEnglishEffect({
    className,
    speed = 1,
    onAnimationComplete,
    ...props
}: Props) {
    const calc = (x: number) => x * speed

    return (
        <motion.svg
            className={cn("h-20", className)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 638 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="14.8883"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            {...props}
        >
            <title>hello</title>

            {/* h1 */}
            <motion.path
                d="M8.69214 166.553C36.2393 151.239 61.3409 131.548 89.8191 98.0295C109.203 75.1488 119.625 49.0228 120.122 31.0026C120.37 17.6036 113.836 7.43883 101.759 7.43883C88.3598 7.43883 79.9231 17.6036 74.7122 40.9363C69.005 66.5793 64.7866 96.0036 54.1166 190.356"
                style={{ strokeLinecap: "round" }}
                initial={initialProps}
                animate={animateProps}
                transition={{
                    duration: calc(0.8),
                    ease: "easeInOut",
                    opacity: { duration: 0.4 },
                }}
            />

            {/* h2, ello */}
            <motion.path
                d="M55.1624 181.135C60.6251 133.114 81.4118 98.0479 107.963 98.0479C123.844 98.0479 133.937 110.703 131.071 128.817C129.457 139.487 127.587 150.405 125.408 163.06C122.869 178.941 130.128 191.348 152.122 191.348C184.197 191.348 219.189 173.523 237.097 145.915C243.198 136.509 245.68 128.073 245.928 119.884C246.176 104.996 237.739 93.8296 222.851 93.8296C203.992 93.8296 189.6 115.17 189.6 142.465C189.6 171.745 205.481 192.341 239.208 192.341C285.066 192.341 335.86 137.292 359.199 75.8585C365.788 58.513 368.26 42.4065 368.26 31.1512C368.26 17.8057 364.042 7.55823 352.131 7.55823C340.469 7.55823 332.777 16.6141 325.829 30.9129C317.688 47.4967 311.667 71.4162 309.203 98.4549C303 166.301 316.896 191.348 349.936 191.348C390 191.348 434.542 135.534 457.286 75.6686C463.803 58.513 466.275 42.4065 466.275 31.1512C466.275 17.8057 462.057 7.55823 450.146 7.55823C438.484 7.55823 430.792 16.6141 423.844 30.9129C415.703 47.4967 409.682 71.4162 407.218 98.4549C401.015 166.301 414.911 191.348 444.416 191.348C473.874 191.348 489.877 165.67 499.471 138.402C508.955 111.447 520.618 94.8221 544.935 94.8221C565.035 94.8221 580.916 109.71 580.916 137.75C580.916 168.768 560.792 192.093 535.362 192.341C512.984 192.589 498.285 174.475 499.774 147.179C501.511 116.907 519.873 94.8221 543.943 94.8221C557.839 94.8221 569.51 100.999 578.682 107.725C603.549 125.866 622.709 114.656 630.047 96.7186"
                style={{ strokeLinecap: "round" }}
                initial={initialProps}
                animate={animateProps}
                transition={{
                    duration: calc(2.8),
                    ease: "easeInOut",
                    delay: calc(0.7),
                    opacity: { duration: 0.7, delay: calc(0.7) },
                }}
                onAnimationComplete={onAnimationComplete}
            />
        </motion.svg>
    )
}

function AppleHelloKoreanEffect({
    className,
    speed = 1,
    onAnimationComplete,
    ...props
}: Props) {
    const calc = (x: number) => x * speed

    return (
        <motion.svg
            className={cn("h-20", className)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="280 420 1160 280"
            fill="none"
            stroke="currentColor"
            strokeWidth="14.8883"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            {...props}
        >
            <title>안녕하세요</title>

            {/* ㅇ part of 안 */}
            <motion.path
                d="M357.039 453.428C356.791 465.09 353.813 473.775 340.165 478.738C323.54 484.693 305.425 496.361 303.193 520.425C300.711 546.232 317.337 567.82 343.391 568.316C368.453 568.564 388.801 552.932 388.304 523.155C387.808 495.363 369.198 480.971 344.88 477.745"
                style={{ strokeLinecap: "round" }}
                initial={initialProps}
                animate={animateProps}
                transition={{
                    duration: calc(0.5),
                    ease: "easeInOut",
                    opacity: { duration: 0.25 },
                }}
            />

            {/* ㄴ part of 안 */}
            <motion.path
                d="M466.22 435.562C463.491 477.249 457.535 529.606 449.347 587.175C445.625 615.959 437.684 623.155 428.999 623.155C420.066 623.155 416.344 612.237 418.577 597.596C421.307 580.227 428.503 566.827 438.925 553.428C451.828 537.051 471.431 521.418 495.501 516.951"
                style={{ strokeLinecap: "round" }}
                initial={initialProps}
                animate={animateProps}
                transition={{
                    duration: calc(0.6),
                    ease: "easeInOut",
                    delay: calc(0.5),
                    opacity: { duration: 0.3, delay: calc(0.5) },
                }}
            />

            {/* Bottom of 안 */}
            <motion.path
                d="M364.483 610.003C361.754 621.17 360.761 637.051 362.498 649.954C365.227 669.309 378.627 679.731 404.93 679.979C425.277 680.227 442.151 677.249 451.332 674.52"
                style={{ strokeLinecap: "round" }}
                initial={initialProps}
                animate={animateProps}
                transition={{
                    duration: calc(0.4),
                    ease: "easeOut",
                    delay: calc(1.1),
                    opacity: { duration: 0.2, delay: calc(1.1) },
                }}
            />

            {/* ㄴ part of 녕 */}
            <motion.path
                d="M562.994 469.309C558.032 489.904 555.302 510.996 555.55 528.614C555.798 553.924 571.431 566.827 592.771 567.324C611.63 567.572 628.503 563.353 637.932 557.646"
                style={{ strokeLinecap: "round" }}
                initial={initialProps}
                animate={animateProps}
                transition={{
                    duration: calc(0.5),
                    ease: "easeOut",
                    delay: calc(1.5),
                    opacity: { duration: 0.25, delay: calc(1.5) },
                }}
            />

            {/* Top line of 녕 */}
            <motion.path
                d="M639.917 483.204C664.483 484.197 683.341 483.453 698.478 481.467"
                style={{ strokeLinecap: "round" }}
                initial={initialProps}
                animate={animateProps}
                transition={{
                    duration: calc(0.3),
                    ease: "easeOut",
                    delay: calc(2.0),
                    opacity: { duration: 0.15, delay: calc(2.0) },
                }}
            />

            {/* Bottom line of 녕 */}
            <motion.path
                d="M635.947 515.959C655.302 516.207 678.13 515.711 694.508 513.974"
                style={{ strokeLinecap: "round" }}
                initial={initialProps}
                animate={animateProps}
                transition={{
                    duration: calc(0.3),
                    ease: "easeOut",
                    delay: calc(2.3),
                    opacity: { duration: 0.15, delay: calc(2.3) },
                }}
            />

            {/* ㅇ of 녕 */}
            <motion.path
                d="M703.193 435.562C700.215 477.249 695.004 521.914 690.289 552.932C686.071 581.219 681.108 595.115 661.009 599.83C641.654 604.296 625.029 617.944 622.547 639.284C619.818 663.353 635.699 682.708 660.513 682.708C684.086 682.708 703.193 668.316 702.944 642.013C702.448 616.455 684.83 601.815 663.242 599.582"
                style={{ strokeLinecap: "round" }}
                initial={initialProps}
                animate={animateProps}
                transition={{
                    duration: calc(0.8),
                    ease: "easeInOut",
                    delay: calc(2.6),
                    opacity: { duration: 0.4, delay: calc(2.6) },
                }}
            />

            {/* Top of 하 */}
            <motion.path
                d="M792.522 448.961C809.644 447.472 823.788 447.472 844.135 449.954"
                style={{ strokeLinecap: "round" }}
                initial={initialProps}
                animate={animateProps}
                transition={{
                    duration: calc(0.3),
                    ease: "easeOut",
                    delay: calc(3.4),
                    opacity: { duration: 0.15, delay: calc(3.4) },
                }}
            />

            {/* Main body of 하 */}
            <motion.path
                d="M776.394 482.956C796.493 480.475 816.344 479.979 838.429 481.716C859.52 482.956 870.439 490.649 868.702 501.07C866.965 511.989 849.843 516.455 819.818 518.192C787.808 519.929 773.913 537.299 772.424 560.128C770.935 581.219 785.079 602.063 810.637 603.552C836.195 604.793 853.317 584.693 854.806 563.85C856.543 538.788 843.143 521.666 819.57 518.44"
                style={{ strokeLinecap: "round" }}
                initial={initialProps}
                animate={animateProps}
                transition={{
                    duration: calc(0.9),
                    ease: "easeInOut",
                    delay: calc(3.7),
                    opacity: { duration: 0.45, delay: calc(3.7) },
                }}
            />

            {/* 세 left part */}
            <motion.path
                d="M931.232 435.562C927.758 485.934 920.314 538.043 910.885 612.733C905.178 658.639 897.982 678.49 887.312 678.49C878.875 678.49 874.657 670.55 876.89 651.939C879.371 631.095 886.071 613.478 898.478 593.626C913.614 569.309 932.473 553.18 962.001 544.743"
                style={{ strokeLinecap: "round" }}
                initial={initialProps}
                animate={animateProps}
                transition={{
                    duration: calc(0.7),
                    ease: "easeOut",
                    delay: calc(4.6),
                    opacity: { duration: 0.35, delay: calc(4.6) },
                }}
            />

            {/* 세 middle part */}
            <motion.path
                d="M1078.88 445.487C1066.47 496.108 1055.8 532.584 1040.41 566.579C1031.23 586.927 1021.31 592.634 1012.62 590.401C1003.94 587.919 1002.94 576.505 1009.4 561.616C1019.07 540.525 1037.93 520.674 1058.78 521.17C1078.88 521.418 1093.27 544.991 1100.71 588.415"
                style={{ strokeLinecap: "round" }}
                initial={initialProps}
                animate={animateProps}
                transition={{
                    duration: calc(0.6),
                    ease: "easeOut",
                    delay: calc(5.3),
                    opacity: { duration: 0.3, delay: calc(5.3) },
                }}
            />

            {/* 세 right part */}
            <motion.path
                d="M1100.71 588.415C1104.68 546.976 1117.09 521.666 1139.42 524.147C1162.75 526.629 1169.45 554.172 1152.32 628.366"
                style={{ strokeLinecap: "round" }}
                initial={initialProps}
                animate={animateProps}
                transition={{
                    duration: calc(0.5),
                    ease: "easeOut",
                    delay: calc(5.9),
                    opacity: { duration: 0.25, delay: calc(5.9) },
                }}
            />

            {/* 요 vertical line */}
            <motion.path
                d="M1211.63 435.562C1208.65 516.207 1199.97 593.13 1183.09 673.527"
                style={{ strokeLinecap: "round" }}
                initial={initialProps}
                animate={animateProps}
                transition={{
                    duration: calc(0.5),
                    ease: "easeOut",
                    delay: calc(6.4),
                    opacity: { duration: 0.25, delay: calc(6.4) },
                }}
            />

            {/* 요 circle */}
            <motion.path
                d="M1345.62 434.321C1346.12 446.728 1343.64 455.165 1329.5 459.383C1310.64 465.09 1293.27 478.242 1291.03 502.807C1288.8 528.614 1305.43 549.954 1332.97 550.202C1359.02 550.45 1379.37 532.832 1378.87 505.289C1378.38 477.745 1359.77 461.616 1334.21 458.887"
                style={{ strokeLinecap: "round" }}
                initial={initialProps}
                animate={animateProps}
                transition={{
                    duration: calc(0.6),
                    ease: "easeInOut",
                    delay: calc(6.9),
                    opacity: { duration: 0.3, delay: calc(6.9) },
                }}
            />

            {/* 요 small vertical */}
            <motion.path
                d="M1315.6 581.964C1318.08 593.875 1318.14 616.786 1317.4 625.223"
                style={{ strokeLinecap: "round" }}
                initial={initialProps}
                animate={animateProps}
                transition={{
                    duration: calc(0.3),
                    ease: "easeOut",
                    delay: calc(7.5),
                    opacity: { duration: 0.15, delay: calc(7.5) },
                }}
            />

            {/* 요 bottom wave */}
            <motion.path
                d="M1357.04 582.708C1355.55 636.058 1315.1 652.187 1279.37 654.42C1257.78 655.909 1248.35 651.195 1249.35 642.262C1250.09 633.825 1263.74 625.14 1311.38 625.14C1342.4 625.14 1379.62 631.84 1425.28 647.969"
                style={{ strokeLinecap: "round" }}
                initial={initialProps}
                animate={animateProps}
                transition={{
                    duration: calc(0.7),
                    ease: "easeOut",
                    delay: calc(7.8),
                    opacity: { duration: 0.35, delay: calc(7.8) },
                }}
                onAnimationComplete={onAnimationComplete}
            />
        </motion.svg>
    )
}

function AppleHelloHindiEffect({
    className,
    speed = 1,
    onAnimationComplete,
    ...props
}: Props) {
    const calc = (x: number) => x * speed

    // Real paths extracted from hindi.svg for "नमस्ते"
    const paths = [
        // 1. First vertical stroke part
        "M604.384 572.134C615.293 575.605 622.498 584.422 622.498 597.692C622.498 612.084 612.325 623.251 598.677 623.251C586.022 623.251 576.841 614.318 576.841 601.166C576.841 582.401 593.218 570.397 618.528 571.141C644.086 571.886 665.723 585.795 682.367 607.2",
        // 2. Vertical bar
        "M695.502 515.716C686.459 576.007 679.303 631.814 673.71 687.12",
        // 3. Middle loop start
        "M778.556 513.05C779.117 540.108 778.81 559.821 776.869 582.199C774.007 615.189 762.119 635.247 742.936 635.247C731.295 635.247 722.844 627.466 722.844 615.531C722.844 599.353 737.901 586.412 765.653 587.508C791.863 588.543 818.651 596.995 837.138 614.157",
        // 4. Vertical bar next to loop
        "M851.489 512.14C842.255 572.293 834.672 629.915 829.379 685.134",
        // 5. 'sa' bottom loop part
        "M935.949 512.151C956.816 524.183 970.098 550.734 970.098 576.21C970.098 607.273 949.465 627.717 920.47 627.717C892.249 627.717 873.145 608.17 879.527 592.481C884.864 579.363 903.378 578.944 918.237 590.993C936.674 605.943 944.044 638.896 947.021 683.3",
        // 6. Connecting stroke
        "M965.474 599.681C980.085 605.452 1001.16 606.445 1020.42 601.936",
        // 7. Last Vertical bar
        "M1118.98 510.265C1108.81 571.75 1100.37 629.141 1093.92 685.037",
        // 8. 'ta' loop
        "M1098.89 644.594C1103.98 605.467 1090.69 574.615 1058.43 574.615C1034.37 574.615 1015.75 597.196 1015.75 625.236C1015.75 645.583 1023.2 667.916 1037.09 683.548",
        // 9. Matra (e)
        "M1083.26 467.562C1047.62 465.145 1036.86 454.523 1036.86 443.661C1036.86 434.964 1044.71 429.175 1055.51 429.597C1080.29 430.502 1104.96 457.465 1117.58 492.573",
        // 10. Shirorekha (Horizontal line on top) - Draw this LAST
        "M569.444 510.811C592.91 511.002 621.009 511.34 657.371 511.34C694.178 511.34 770.165 511.389 815.623 511.336C857.091 511.288 958.683 511.154 1014.78 511.155C1068.18 511.156 1114.85 510.576 1158.93 509.415",
    ]

    return (
        <motion.svg
            className={cn("h-20", className)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="550 420 620 300"
            fill="none"
            stroke="currentColor"
            strokeWidth="14.8883"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            {...props}
        >
            <title>Namaste</title>

            {paths.map((d, index) => (
                <motion.path
                    key={index}
                    d={d}
                    style={{ strokeLinecap: "round" }}
                    initial={initialProps}
                    animate={animateProps}
                    transition={{
                        duration: calc(index === paths.length - 1 ? 0.8 : 0.5), // Shirorekha takes longer
                        ease: "easeInOut",
                        delay: calc(index * 0.3),
                        opacity: { duration: 0.25, delay: calc(index * 0.3) },
                    }}
                    onAnimationComplete={index === paths.length - 1 ? onAnimationComplete : undefined}
                />
            ))}
        </motion.svg>
    )
}

function AppleHelloItalianEffect({
    className,
    speed = 1,
    onAnimationComplete,
    ...props
}: Props) {
    const calc = (x: number) => x * speed

    // Real paths extracted from italian.svg for "ciao"
    const paths = [
        // c part
        "M698.368 525.47C693.465 516.041 683.143 509.093 667.401 509.093C637.597 509.093 622.944 534.899 622.944 560.209C622.944 587.753 641.009 608.1 671.663 608.1C711.329 608.1 746.817 578.141 754.956 534.341C756.335 526.916 758.18 519.331 759.449 511.822",
        // i part
        "M759.449 511.822C756.597 528.696 753.971 542.592 752.326 554.998C751.395 563.187 750.95 570.135 751.002 577.083C751.135 594.949 758.17 607.108 775.371 607.108C799.495 607.108 823.024 580.243 831.425 550.791",
        // a part
        "M909.684 528.59C904.819 517.395 894.479 509.837 878.019 509.837C850.724 509.837 830.211 537.132 828.864 566.413C827.69 593.212 840.056 608.276 857.67 608.1C882.67 607.85 901.047 583.294 909.25 531.337C910.262 524.926 911.311 518.233 912.323 511.822",
        // o part
        "M912.323 511.822C911.298 518.325 910.274 524.827 909.249 531.33C904.768 559.769 902.7 570.99 902.922 578.323C903.44 595.445 909.598 607.107 925.877 607.107C948.376 607.107 966.779 580.316 976.079 553.884C985.465 527.207 997.128 510.581 1021.45 510.581C1041.54 510.581 1057.43 525.47 1057.43 553.509C1057.43 584.527 1037.3 607.852 1011.87 608.1C989.493 608.348 974.795 590.234 976.284 562.939C978.021 532.666 996.383 510.581 1020.45 510.581C1034.35 510.581 1046.02 516.758 1055.19 523.485C1080.06 541.625 1099.22 530.415 1106.56 512.478",
    ]

    // Manual timing to make the writing flow smoother based on path length
    const transitions = [
        { duration: 0.4, delay: 0 },     // 'c'
        { duration: 0.4, delay: 0.35 },  // 'i' (connects to c)
        { duration: 0.6, delay: 0.85 },  // 'a' (lift pen gap)
        { duration: 0.9, delay: 1.4 },   // 'o' (connects to a, long stroke)
    ]

    return (
        <motion.svg
            className={cn("h-20", className)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="600 480 520 220"
            fill="none"
            stroke="currentColor"
            strokeWidth="14.8883"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            {...props}
        >
            <title>ciao</title>

            {paths.map((d, index) => (
                <motion.path
                    key={index}
                    d={d}
                    style={{ strokeLinecap: "round" }}
                    initial={initialProps}
                    animate={animateProps}
                    transition={{
                        duration: calc(transitions[index].duration),
                        ease: "easeInOut",
                        delay: calc(transitions[index].delay),
                        opacity: { duration: 0.25, delay: calc(transitions[index].delay) },
                    }}
                    onAnimationComplete={index === paths.length - 1 ? onAnimationComplete : undefined}
                />
            ))}
        </motion.svg>
    )
}

function AppleHelloCzechEffect({
    className,
    speed = 1,
    onAnimationComplete,
    ...props
}: Props) {
    const calc = (x: number) => x * speed

    // Real paths extracted from czech.svg for "ahoj"
    const paths = [
        // a - first stroke
        "M697.944 533.482C693.08 522.287 682.74 514.729 666.28 514.729C638.985 514.729 618.472 542.024 617.125 571.305C615.951 598.104 628.317 613.168 645.931 612.992C670.931 612.742 689.308 588.186 697.511 536.229C698.523 529.818 699.572 523.124 700.584 516.714",
        // h - second stroke  
        "M700.584 516.714C699.559 523.217 698.535 529.719 697.51 536.222C693.029 564.661 690.961 575.882 691.183 583.215C691.702 600.337 697.859 612 716.16 612C745.771 612 775.984 553.934 802.752 517.695C821.438 492.396 830.549 469.722 831.046 451.654C831.295 438.255 824.843 428.09 812.684 428.09C799.285 428.09 790.848 438.255 785.637 461.587C779.93 487.23 775.711 516.655 765.041 611.007",
        // o - third stroke
        "M766.087 601.786C771.351 555.512 792.336 518.699 818.887 518.699C834.768 518.699 844.861 531.354 841.995 549.468C840.382 560.138 837.467 572.545 835.802 584.704C833.776 600.089 839.564 611.999 857.308 611.999C882.014 611.999 893.298 585.08 902.564 558.743C911.939 532.099 923.602 515.473 947.92 515.473C968.019 515.473 983.9 530.362 983.9 558.401C983.9 589.419 963.776 612.744 938.346 612.992C915.968 613.24 901.269 595.126 902.758 567.831C904.495 537.558 922.857 515.473 946.927 515.473C960.823 515.473 970.5 520.188 981.666 528.377C1016.24 553.595 1044.91 541.401 1055.12 516.466",
        // j - fourth stroke
        "M1055.12 516.466C1050.48 555.755 1045.85 595.043 1041.22 634.332C1036.63 673.304 1025.09 688.923 1007.72 688.923C996.059 688.923 987.622 681.496 987.622 669.568C987.622 653.63 999.716 642.189 1027.57 633.588C1078.38 617.9 1099.77 599.909 1112.93 565.846",
    ]

    return (
        <motion.svg
            className={cn("h-20", className)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="550 380 600 340"
            fill="none"
            stroke="currentColor"
            strokeWidth="14.8883"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            {...props}
        >
            <title>ahoj</title>

            {paths.map((d, index) => (
                <motion.path
                    key={index}
                    d={d}
                    style={{ strokeLinecap: "round" }}
                    initial={initialProps}
                    animate={animateProps}
                    transition={{
                        duration: calc(0.5),
                        ease: "easeInOut",
                        delay: calc(index * 0.4),
                        opacity: { duration: 0.25, delay: calc(index * 0.4) },
                    }}
                    onAnimationComplete={index === paths.length - 1 ? onAnimationComplete : undefined}
                />
            ))}
        </motion.svg>
    )
}

function AppleHelloJapaneseEffect({
    className,
    speed = 1,
    onAnimationComplete,
    ...props
}: Props) {
    const calc = (x: number) => x * speed

    // Real paths extracted from japanese.svg for "こんにちは"
    const paths = [
        "M445.77 484.815C475.682 485.317 506.752 493.146 519.118 500.643C527.683 505.835 530.39 511.203 530.363 516.814C530.318 526.24 521.528 532.775 510.87 536.123",
        "M452.772 573.281C439.244 583.428 433.122 594.332 432.542 606.224C431.7 623.473 445.96 634.708 473.611 635.472C498.639 636.163 523.206 631.619 537.672 623.639",
        "M641.122 476.539C619.264 518.608 592.029 586.542 577.842 639.27",
        "M577.863 639.237C593.486 598.582 612.141 575.921 632.059 575.873C644.529 575.843 652.466 583.623 655.265 600.35C655.857 603.886 656.449 607.423 657.041 610.959C660.115 629.323 668.133 636.966 681.399 636.966C698.763 636.966 717.588 621.808 727.26 596.648",
        "M789.55 477.547C779.121 526.844 772.392 588.729 770.912 642.592",
        "M829.96 504.958C855.058 502.048 880.947 504.8 891.541 510.021C898.535 513.469 900.787 518.089 900.781 523.035C900.77 531.598 893.439 538.516 884.536 542.75",
        "M835.33 578.625C823.93 588.04 818.789 598.033 818.333 608.843C817.643 625.185 829.748 635.408 853.111 635.687C874.256 635.941 894.998 631.502 907.196 624.128",
        "M949.883 503.657C962.331 512.79 985.824 522.429 1022.24 520.97C1054.76 519.668 1069.77 507.343 1069.77 493.719C1069.77 483.848 1062.72 477.754 1049.32 477.754C1017.91 477.754 988.089 511.208 963.849 582.569",
        "M963.849 582.569C986.189 568.558 1011.61 559.855 1036.06 559.855C1066.75 559.855 1080.04 574.039 1079.97 595.08C1079.88 625.256 1046.48 641.164 1012.22 641.164C990.547 641.164 973.494 636.771 965.265 631.545",
        "M1154.81 478.364C1144.38 527.173 1137.65 588.445 1136.17 641.774",
        "M1192.07 517.671C1214.14 519.906 1267.3 516.922 1295.45 513.356",
        "M1246.74 474.271C1249.67 500.279 1250.67 532.276 1249.71 568.077C1248.41 616.362 1230.9 638.493 1205.67 638.97C1189.06 639.284 1180.32 629.61 1180.48 617.878C1180.66 604.803 1192 594.703 1212.73 594.657C1236.68 594.604 1257.85 607.377 1287.63 635.367",
    ]

    return (
        <motion.svg
            className={cn("h-20", className)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="420 420 900 250"
            fill="none"
            stroke="currentColor"
            strokeWidth="14.8883"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            {...props}
        >
            <title>Konnichiwa</title>

            {paths.map((d, index) => (
                <motion.path
                    key={index}
                    d={d}
                    style={{ strokeLinecap: "round" }}
                    initial={initialProps}
                    animate={animateProps}
                    transition={{
                        duration: calc(0.3),
                        ease: "easeInOut",
                        delay: calc(index * 0.2),
                        opacity: { duration: 0.25, delay: calc(index * 0.2) },
                    }}
                    onAnimationComplete={index === paths.length - 1 ? onAnimationComplete : undefined}
                />
            ))}
        </motion.svg>
    )
}

export { AppleHelloEnglishEffect, AppleHelloKoreanEffect, AppleHelloHindiEffect, AppleHelloItalianEffect, AppleHelloCzechEffect, AppleHelloJapaneseEffect }

