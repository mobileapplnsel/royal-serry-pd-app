import React from 'react';
import { StyleSheet } from 'react-native'
import { Button, Form, Icon, Input, Item, Label, ListItem, Row, Textarea, View, Text, Body, Right, Card, Container, Badge, CardItem } from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import { FlatList } from 'react-native';
import { EmptyCollectionPage } from './EmptyCollectionPage';


import DocumentPicker, { DocumentPickerOptions } from 'react-native-document-picker';
import BaseViewModel from '../Core/BaseViewModel';
import BaseProp from '../Core/BaseProp';
import RNFile from '../Core/RNFile';
import BaseComponent from '../Core/BaseComponent';
import BaseState from '../Core/BaseState';
import BaseColor from '../Core/BaseTheme';


export class CutomFileUploaderViewModel extends BaseViewModel {
    Files: RNFile[] = [];
}

export class CutomFileUploaderProps extends BaseProp {
    FileType: any[];
    MaxFileCount?: number;
    OnComplete?: (Files: RNFile[]) => void;
    OnCancel?: () => void;
    OnUpdate?: (Files: RNFile[]) => void;
    ShowRemoveButton?: boolean;
    Files: RNFile[];
}

export default class CutomFileUploader extends BaseComponent<CutomFileUploaderProps, CutomFileUploaderViewModel>{

    constructor(props: CutomFileUploaderProps) {
        super(props);
        this.state = new BaseState(new CutomFileUploaderViewModel());
    }

    componentDidMount() {
        this.HandleCommonMountAndUpdate(false);
    }
    componentDidUpdate(prevProps: CutomFileUploaderProps, prevState: BaseState<CutomFileUploaderViewModel>) {
        if (prevProps.Files !== this.props.Files) {
            this.HandleCommonMountAndUpdate(true);
        }

    }

    HandleCommonMountAndUpdate = (FromUpdate: boolean) => {
        var model = this.state.Model;

        if (FromUpdate && this.props?.Files !== model.Files) {
            model.Files = this.props.Files;
        }

        this.UpdateViewModel();
    }

    HandlePickDocument = async () => {
        try {
            const res = await DocumentPicker.pickMultiple({
                type: this.props.FileType,
            });



            if (res.length > this.props.MaxFileCount) {
                this.ShowToastMesage("Maximum " + this.props.MaxFileCount + " files are permitted to upload", "danger", 2000)
                return;
            }

            var model = this.state.Model;
            model.Files = [];

            model.Files = res.map(i => new RNFile(i.uri, i.type, i.name))

            this.UpdateViewModel();

            this.props.OnComplete && this.props.OnComplete(model.Files);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                this.props.OnCancel && this.props.OnCancel();
            } else {
                console.log("Unhandled exception")
            }
        }
    };
    HandleRemoveFile = (File: RNFile) => {
        var model = this.state.Model;
        var OtherFiles = model.Files.filter(i => i.uri !== File.uri)
        model.Files = OtherFiles;
        this.UpdateViewModel();
        this.props.OnUpdate && this.props.OnUpdate(model.Files);
    }
    render() {
        var model = this.state.Model;

        return (

            <Card>
                <CardItem bordered style={{ alignSelf: "center" }}>
                    <Button badge style={{backgroundColor:BaseColor.ColorGreen}} onPress={() => this.HandlePickDocument()}                                              >
                        <Text style={{ color: BaseColor.ColorWhite }}>Select files to upload</Text>
                        <Badge success style={{ marginTop: -10, marginRight: -5 }}  ><Text>{model.Files?.length ?? 0}</Text></Badge>
                    </Button>

                </CardItem>
                <FlatList
                    extraData={model.IsPageLoading}
                    nestedScrollEnabled
                    maxHeight={200}
                    scrollEnabled={true}
                    keyExtractor={(item) => item.uri}
                    data={model.Files}
                    ListEmptyComponent={<EmptyCollectionPage EmptyText={"No files"} />}
                    renderItem={({ item }) => {
                        var i = item;

                        return (

                            <ListItem>
                                <Body>
                                    <View style={styles.RowView}>
                                        <Text style={styles.ValueStyle}>
                                            {i.name}
                                        </Text>
                                    </View>
                                </Body>
                                <Right>
                                    <FontAwesomeIcon style={{ fontSize: 20, marginEnd: 10 }}
                                        color={BaseColor.ColorOrange} name={"trash"}
                                        onPress={() => this.HandleRemoveFile(i)} />
                                </Right>
                            </ListItem>

                        )
                    }} />

            </Card>

        )
    }
}

const styles = StyleSheet.create({

    RowView: { flexDirection: 'row', justifyContent: 'space-between' },
    LabelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: BaseColor.ColorPink,
    },
    ValueStyle: { alignSelf: 'center', fontSize: 12 },

});