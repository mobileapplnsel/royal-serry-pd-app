import { StyleSheet } from 'react-native'
import BaseColor from '../Core/BaseTheme';

export const AppStyles = StyleSheet.create({
  CustomImageStyle: {
    alignContent: 'center',
    width: 100,
    height: 100,
    alignSelf: 'center',
  },

  ButtonContainerVertical: {
    flexDirection: 'row',
    alignContent: "center"
  },
  ButtonIconVertical: {
    fontSize: 20,
    color: BaseColor.ColorWhite,
    marginEnd: 10
  },
  Icon: {
    fontSize: 60,
    alignSelf: 'center',
    color: BaseColor.HeaderColor,
  },
  ListItemInlineIcon: {
    fontSize: 40,
    alignSelf: 'center',
    color: BaseColor.ColorGreen,
  },
  NameStyle: { alignSelf: 'flex-start' },

  HeaderCardStyle: {
    justifyContent: 'center',
    height:50
  },
  HeaderCardTxt: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: BaseColor.ColorGreen,
    fontSize: 15
  },
  FooterStyle: {
    marginTop: 10
  },
  FooterTabStyle: {
    backgroundColor: BaseColor.ColorGreen
  },
  ClickableText: {
    color: '#56AFFC'
  },
  ParagraphHeadingIcon: {
    fontSize: 20,
    alignSelf: 'flex-start',
    color: BaseColor.ColorGreen,
  },
  ParagraphHeadingTxt: {
    color: BaseColor.ColorGreen,
    fontSize: 17
  },
  TermAndConditionText: {
    fontSize: 10,
    color: BaseColor.ColorGrey
  },
  BadgeStyle: {
    backgroundColor: BaseColor.ColorGreen,
    height: 22,
    alignSelf: 'flex-start',
    marginLeft: 90,
    display: 'flex',
  },
});

