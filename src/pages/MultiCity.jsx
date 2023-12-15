import React from "react";
import { Button, Flag } from "semantic-ui-react";
import { FaArrowRightLong, FaCircleCheck } from "react-icons/fa6";

const List = ({ title, description }) => {
  return (
    <div className="flex flex-col">
      <p className="text-base font-montserrat-regular text-slate-500">
        {title}
      </p>
      <p className="text-2xl">{description}</p>
    </div>
  );
};

const Row = () => {
  return (
    <div className="grid grid-cols-7">
      <div className="flex flex-col p-5 gap-y-2 col-span-3">
        <div className="w-full flex justify-between mb-2 items-center border-b border-b-slate-400 pb-1">
          <p className="text-lg font-montserrat-bold">From</p>
          <Flag name="ph" />
        </div>
        <List
          description="Hamid Karzai International Airport"
          title="Airport"
        />
        <List description="Afghanistan" title="Country" />
        <List description="Kabul" title="Location" />
      </div>
      <div className="flex items-center col-span-1 flex-col">
        <FaArrowRightLong className="w-10 min-w-[2.5rem] h-9 mt-4" />
      </div>
      <div className="flex flex-col p-5 gap-y-2 col-span-3">
        <div className="w-full flex justify-between mb-2 items-center border-b border-b-slate-400 pb-1">
          <p className="text-lg font-montserrat-bold">To</p>
          <Flag name="ph" />
        </div>
        <List
          description="Hamid Karzai International Airport Hamid Karzai International Airport"
          title="Airport"
        />
        <List description="Afghanistan" title="Country" />
        <List description="Kabul" title="Location" />
      </div>
    </div>
  );
};

function MultiCity() {
  return (
    <div className="w-full h-screen bg-light p-pad flex flex-col gap-y-10 overflow-y-scroll">
      <header className="w-full flex items-center justify-between">
        <span className="text-3xl flex items-center gap-x-3 font-montserrat-black text-green-500 uppercase">
          available flight found <FaCircleCheck className="w-7 h-7" />
        </span>
        <Button color="blue" icon="angle left" content="Back to homepage" />
      </header>
      <div className="w-full">
        <p className="text-base font-montserrat-bold text-center">
          Multi city flight
        </p>
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-y-1">
          <div className="text-2xl">
            5 Passengers = <b>₱5300</b>
          </div>
          <div className="text-2xl">
            Premium Class = <b>₱2300</b>
          </div>
          <div className="text-2xl">
            Flight = <b>₱5300</b>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 justify-end">
          <p className="text-3xl">Total: ₱15500</p>
          <Button color="green" fluid>
            BOOK NOW
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MultiCity;
