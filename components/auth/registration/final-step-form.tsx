import LetterOpen from '@components/icons/letter-open';
import { PartyPopper } from '@components/icons/party-popper';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const FinalStepForm = () => {
  const { t } = useTranslation();

  const [{ width, height }, setDimensions] = useState({
    width: 1000,
    height: 1000
  });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setDimensions({ width: window?.innerWidth, height: window?.innerHeight });
  }, []);

  return (
    <div className="h-full mb-8">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          onConfettiComplete={(confetti) => {
            setShowConfetti(false);
            confetti.reset();
          }}
          recycle={false}
        />
      )}
      <div className="flex items-center justify-center flex-col">
        <PartyPopper />
        <h1 className="my-5 text-gray-700 font-bold text-2xl">
          {t('common:congrats')}
        </h1>
        <p className="text-gray-700 text-sm">
          {"You're now just one step away from realizing your dream business."}
        </p>
      </div>

      <div className="mt-16 mb-32">
        <div className="border flex items-center p-5 rounded-md">
          <div className="text-blue-500 mr-5">
            <LetterOpen />
          </div>
          <div className="text-sm text-gray-500">
            {
              "Remember to check your inbox – we've sent you a link to verify your account."
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalStepForm;
