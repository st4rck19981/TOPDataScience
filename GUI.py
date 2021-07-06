from tkinter import *
from tkinter import ttk
from tkinter.filedialog import askopenfile
import tkinter.font as tkFont
from PIL import Image,ImageTk


import pandas as pd
import unidecode
import pickle
import matplotlib.pyplot as plt
from wordcloud import WordCloud, ImageColorGenerator, STOPWORDS
import numpy as np
from PIL import Image
import random
from palettable.colorbrewer.sequential import Reds_9
from palettable.cmocean.diverging import Balance_20
from palettable.tableau import BlueRed_12

def color_func(word, font_size, position, orientation, random_state=None, **kwargs):
    return tuple(Balance_20.colors[random.randint(2,18)])
sw=set(STOPWORDS)
#######################################


def open_file():
	global nombre_data,file,df,columnas
	file_path=askopenfile()
	print(str(file_path))
	name=list(str(file_path).split("'"))
	file=name[1]
	name=list(str(file).split("/"))
	name=name[-1]

	nombre_data.set(str(name))

	df=pd.read_csv(file,encoding='utf8')
	print(df.shape)
	tamano_data.set(str(df.shape))


	columns=""
	for col in df.columns.values:
		columns=columns+col+"\n"
	columnas.set(str(columns))


def new_word_cloud():
	global df,file
	print(file)
	#df=pd.read_csv(file,encoding='utf8')
	#print(str(columna_data))

	columna=columna_data.get()
	print(str(columna))

	if len(columna)==0:
		textos=' '.join(df.fillna('')['content'].tolist())
	else:
		textos=' '.join(df.fillna('')[str(columna)].tolist())
	
	wc = WordCloud(
    background_color="rgba(255,255,255,0)",mode="RGBA",
    width=1800,
    height=1400,
    stopwords=[]
	).generate(textos)

	wc.recolor(color_func=color_func, random_state=5)
	plt.imshow(wc)
	plt.axis('off')
	plt.savefig('./X.png',dpi=600)
	#plt.show()


	global label1
	imageWC=Image.open("X.png").resize((660,500),Image.ANTIALIAS)
	imageWC=ImageTk.PhotoImage(imageWC)
	label1.config(image=imageWC)


###################################################

raiz=Tk()
raiz.title("Prueba")
raiz.resizable(0,0)
raiz.geometry("1280x720")

nombre_data=StringVar()
tamano_data=StringVar()
columna_data=StringVar()
columnas=StringVar()
file=""   #archivo csv raiz
df=pd.DataFrame()

#########################################

fontStyle=tkFont.Font(family="Lucida Grande", size=15)
fontPeque=tkFont.Font(family="Lucida Grande", size=9)

Frame2=Frame(raiz,width=300,height=500)
Frame2.pack(side="left",anchor="n")
Frame2.config(bd=5,relief="sunken")
Frame2.config(bg="LightCyan2")
label1_2=Label(Frame2,text="Subir DATASET",font=fontPeque).grid(row=0,column=0,padx=10)
button1_2=Button(Frame2,text="Subir un archivo",command=lambda:open_file(),font=fontStyle).grid(row=0,column=1)
label1_2=Label(Frame2,text="Nombre: ").grid(row=1,column=0,padx=4)
label2_2=Label(Frame2,textvariable=nombre_data).grid(row=1,column=1,padx=4)
label3_2=Label(Frame2,text="Tamano: ").grid(row=2,column=0,padx=4)
label4_2=Label(Frame2,textvariable=tamano_data).grid(row=2,column=1,padx=4)
label5_2=Label(Frame2,text="Columnas: ").grid(row=3,column=0,padx=4)
label5_2=Label(Frame2,textvariable=columnas).grid(row=3,column=1,padx=4)


Frame1=Frame(raiz,width=300,height=100)
Frame1.pack(side="right",anchor="n")
Frame1.config(bd=5,relief="sunken")
Frame1.config(bg="red")
Frame1_tamano=Label(Frame1,text="Tamano: ",font=fontStyle).place(x=0,y=0)


Frame5=Frame(raiz,width=800,height=1000)
Frame5.pack(side="top",anchor="w")
label0=Label(Frame5,text="Columna a contar: ",font=fontStyle).grid(row=0,column=0)
label2_5=Entry(Frame5,textvariable=columna_data).grid(row=0,column=1)
button1=Button(Frame5,text="Generar Nuevo Grafico",command=lambda:new_word_cloud(),font=fontStyle).grid(row=0,column=2,sticky='e')



imageWC=Image.open("Negativo.png").resize((660,500),Image.ANTIALIAS)
imageWC=ImageTk.PhotoImage(imageWC)
Frame2=Frame(raiz,width=660,height=500)
Frame2.pack(after=Frame5,anchor="s")
label1=Label(Frame2,image=imageWC).grid(row=0,column=0,columnspan=3)




#label1=Frame(raiz,width=660,height=500)
#label1.pack()
#label1=Label(raiz,image=imageWC).place(x=10,y=200)


raiz.mainloop()