
import {  Container } from "@mantine/core"
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { CreateDiscussionForm } from "..";


export const CreateDiscussionPage = () => {

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  }
  return (
<Container size="xl">
  <div className="mb-4 flex items-center">
  <IoArrowBackCircleOutline size={20} onClick={handleGoBack} />
  <span className="ml-2 font-medium">Go back</span>
  </div>
    <div className="mt-11 grid md:grid-cols-2">   
        {/* Input section */}
        <div className="max-w-xl">
      <CreateDiscussionForm/>
        </div> 
        {/* Etiquette and Rules section */}
        <div className=" pr-5 ">
            <div className="p-5 border rounded shadow-md bg-white max-w-sm">
                <h3 className="text-xl font-bold mb-3">Etiquette and Rules</h3>
                <ul className="list-disc pl-5">
                    <li>Rule 1: Be respectful.</li>
                    <li>Rule 2: No spamming.</li>
                    {/* ... other rules ... */}
                </ul>
            </div>
        </div>
    </div>
</Container>
  );
};

