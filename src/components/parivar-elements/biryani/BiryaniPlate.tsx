import bowl from "@/assets/parivar-elements/biryani/biryani-dish.png";

export function BiryaniPlate() {
  return (
    <img
      src={bowl}
      alt="Hyderabadi biryani"
      className="parivar-biryani-plate pointer-events-none absolute left-1/2 top-[46%] z-20 h-[330px] w-auto -translate-x-1/2 -translate-y-1/2 select-none drop-shadow-[0_28px_70px_oklch(0_0_0_/_0.28)] sm:h-[430px] lg:h-[560px]"
      draggable={false}
    />
  );
}
