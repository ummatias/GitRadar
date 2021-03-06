import React from 'react';
import { normalizeName } from '../../utils/normalizeStrings';
import arrow from '../../assets/arrow.svg';
import {
  Arrow,
  Container,
  InfoContainer,
  Label,
  Photo,
  SubLabel,
} from './styles';

interface ListItemProps {
  photo?: string;
  label: string;
  subLabel: string;
  link?: string;
  isExternal?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({
  photo,
  label,
  subLabel,
  link,
  isExternal,
}) => (
  <Container href={link} target={isExternal ? '_blank' : undefined}>
    {photo && <Photo src={photo} />}

    <InfoContainer>
      <Label>{label}</Label>
      <SubLabel>{normalizeName(subLabel, 34)}</SubLabel>
    </InfoContainer>

    <Arrow src={arrow} />
  </Container>
);

export default ListItem;
