import React from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { BAR_TABLE } from '../../themes/Colors';

interface SignaturePadProps {
  penColor?: string;
  width?: number;
  height?: number;
  signaturePadRef: React.MutableRefObject<SignatureCanvas>;
}

const SignaturePad = (props: SignaturePadProps) => {
  const { penColor, signaturePadRef, width, height } = props;

  return (
    <SignatureCanvas
      ref={(ref) => {
        signaturePadRef.current = ref;
      }}
      penColor={penColor}
      backgroundColor={BAR_TABLE}
      canvasProps={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  );
};

SignaturePad.defaultProps = {
  penColor: 'black',
  width: 300,
  height: 200,
};

export default SignaturePad;
