'use client'

import Icon from '@mui/material/Icon';
import { useEffect, useState } from "react";

import * as S from './style'

export const Card = ({ children, label, valor, isMeta, metas = [], saldo = 0 }) => {
    const [ meta, setMeta ] = useState(null)
    const [ metaCalc, setMetaCal ] = useState(0)

    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'meta') setMeta(value)
        console.log(meta)
    }

    return (
    <S.ChartContainer>
        <S.IconWraper>
            <Icon sx={{ color: '#fff' }}>{ children }</Icon>
        </S.IconWraper>
        <S.Content>
            <S.Content>{ label }</S.Content>
            { !isMeta && <S.Content style={{ fontWeight: 600 }}>{ valor }</S.Content> }
            { isMeta && <S.Content style={{ fontWeight: 600 }}>{ `${(((meta - saldo) / meta) * 100).toFixed(0)}%` }</S.Content> }
        </S.Content>
        { isMeta &&
            <S.FormControl fullWidth>
                <S.InputLabel id="meta">Meta</S.InputLabel>
                <S.Select
                    labelId="meta"
                    id="meta_select"
                    name="meta"
                    value={ meta }
                    label="Meta"
                    onChange={ onChangeValue }
                >
                    { metas.map(meta => 
                        <S.MenuItem key={ meta.id } value={ meta.valor }>{ meta.descricao }</S.MenuItem>
                    ) }
                </S.Select>
            </S.FormControl> }
    </S.ChartContainer>)
};

export default Card;