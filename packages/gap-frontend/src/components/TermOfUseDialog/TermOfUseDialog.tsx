import { BLACK_COLOR } from 'gap-common/src/themes/Colors';
import React, { memo } from 'react';

import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material';

import { useBreakPoints } from '../../utils/customHooks';
import { ListIcon } from './style';

interface Props {
  open: boolean;
  onClickClose: () => void;
}

function TermOfUseDialog({ open, onClickClose }: Props) {
  const { isScreenSm } = useBreakPoints();
  return (
    <Dialog open={open} maxWidth="lg">
      <DialogContent>
        <Box p={isScreenSm ? 4 : 8}>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" flexDirection="column">
              <Typography>Agreement</Typography>
              <Typography variant="h3" sx={{ color: BLACK_COLOR }}>
                Term of Use
              </Typography>
            </Box>
            <Box>
              <Button variant="outlined" onClick={onClickClose}>
                Close
              </Button>
            </Box>
          </Box>
          <Box mt={5}>
            <Typography>
              Terms of use are the rules, specifications, and requirements for
              the use of a product or service. They serve as a contract between
              the product or service provider and user. The phrase is sometimes
              used interchangeably with “terms of service” or “terms and
              conditions”.
            </Typography>
          </Box>
          <Box mt={3}>
            <Typography>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using &apos;Content here,
              content here&apos;, making it look like readable English. Many
              desktop publishing packages and web page editors now use Lorem
              Ipsum as their default model text, and a search for &apos;lorem
              ipsum&apos; will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).
            </Typography>
          </Box>
          <Box mt={1}>
            <Box display="flex" alignItems="center" mt={2}>
              <Box mr={2}>
                <ListIcon color="list" />
              </Box>
              <Typography>Lorem Ipsum is simply dummy text</Typography>
            </Box>
            <Box display="flex" alignItems="center" mt={2}>
              <Box mr={2}>
                <ListIcon color="list" />
              </Box>
              <Typography>Lorem Ipsum is simply dummy text</Typography>
            </Box>
            <Box display="flex" alignItems="center" mt={2}>
              <Box mr={2}>
                <ListIcon color="list" />
              </Box>
              <Typography>Lorem Ipsum is simply dummy text</Typography>
            </Box>
            <Box display="flex" alignItems="center" mt={2}>
              <Box mr={2}>
                <ListIcon color="list" />
              </Box>
              <Typography>Lorem Ipsum is simply dummy text</Typography>
            </Box>
          </Box>
          <Box mt={3}>
            <Typography>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don&apos;t look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn&apos;t anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined chunks as necessary, making
              this the first true generator on the Internet. It uses a
              dictionary of over 200 Latin words, combined with a handful of
              model sentence structures, to generate Lorem Ipsum which looks
              reasonable. The generated Lorem Ipsum is therefore always free
              from repetition, injected humour, or non-characteristic words etc.
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default memo(TermOfUseDialog);
