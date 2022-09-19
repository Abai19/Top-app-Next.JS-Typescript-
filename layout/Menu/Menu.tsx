import React, {useContext} from 'react';
import {AppContext} from "../../context/app.context";
import {FirstLevelMenuItem, PageItem} from '../../interfaces/menu.interface'
import styles from './Menu.module.css'
import cn from "classnames";
import Link from "next/link";
import {useRouter} from "next/router";
import {firstLevelMenu} from "../../helpers/helpers";


export const Menu = () : JSX.Element => {
    const {menu,setMenu,firstCategory} = useContext(AppContext);
    const openSecondLevel = (secondCategory: string)=>{
       setMenu && setMenu(menu.map(m=>{
            if(m._id.secondCategory ==secondCategory){
                m.isOpened=!m.isOpened
            }
            return m
        }))
    }

    const router = useRouter();

    const buildFirstLevel = ()=>{
        return (
            <>
                {firstLevelMenu.map(m=> {
                    return (
                    <div key={m.route}>
                        <Link href={`/${m.route}`}>
                            <a>
                                <div className={cn(styles.firstLevel, {
                                    [styles.firstLevelActive]: m.id ==firstCategory
                                })}>
                                    {m.icon}
                                    <span> {m.name}</span>
                                </div>
                            </a>
                        </Link>

                        {m.id== firstCategory && buildSecondLevel(m)}
                    </div>
                    )
                })}
            </>
        )
    }
    const buildSecondLevel = (menuItem: FirstLevelMenuItem)=>{
        return (
            <div>
                {menu.map(m=> {
                    if (m.pages.map(p=> p.alias).includes(router.asPath.split('/')[2])){
                        m.isOpened=true
                    }
                    return (
                        <div key={m._id.secondCategory} className={styles.secondBlock}>
                            <div className={styles.secondLevel} onClick={()=>openSecondLevel(m._id.secondCategory)}>{m._id.secondCategory}</div>
                            <div className={cn(styles.secondLevelBlock,{
                                [styles.secondLevelBlockOpened]: m.isOpened
                            })}></div>
                            {buildThirdLevel(m.pages, menuItem.route )}
                        </div>
                    )
                })}
            </div>
        )
    }
    const buildThirdLevel = (pages: PageItem[], route:string) =>{
          return (
              pages.map(p => (
                    <Link key= {p._id} href={`/${route}/${p.alias}`}>

                        <a className={cn(styles.thirdLevel,{
                       [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
                   })}> {p.category} </a>
                  </Link>
                  )
              )
          )

    }
    return (
         <div className={styles.menu}>
             <ul>
                 { buildFirstLevel()}
             </ul>

         </div>
    );
};

