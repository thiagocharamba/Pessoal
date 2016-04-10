using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace jogoDaVelha
{
    public partial class Form1 : Form
    {
        public static string Escolha;

        public static List<List<string>> Matriz;

        public Form1()
        {
            InitializeComponent();
        }

        public void MudarEscolha()
        {
            if (Escolha.Equals("O"))
                Escolha = "X";
            else
                Escolha = "O";
        }

        public void VerificarGanhador()
        {
            try
            {
                #region Linha 1
                if (!string.IsNullOrEmpty(Matriz[0][0]) && !string.IsNullOrEmpty(Matriz[0][1]) && !string.IsNullOrEmpty(Matriz[0][2]))
                {
                    if (Matriz[0][0] == "O" && Matriz[0][1] == "O" && Matriz[0][2] == "O")
                    {
                        throw new Exception(txtJogador1.Text);
                    }
                    else if (Matriz[0][0] == "X" && Matriz[0][1] == "X" && Matriz[0][2] == "X")
                    {
                        throw new Exception(txtJogador2.Text);
                    }
                }
                #endregion

                #region Linha 2
                if (!string.IsNullOrEmpty(Matriz[1][0]) && !string.IsNullOrEmpty(Matriz[1][1]) && !string.IsNullOrEmpty(Matriz[1][2]))
                {
                    if (Matriz[1][0] == "O" && Matriz[1][1] == "O" && Matriz[1][2] == "O")
                    {
                        throw new Exception(txtJogador1.Text);
                    }
                    else if (Matriz[1][0] == "X" && Matriz[1][1] == "X" && Matriz[1][2] == "X")
                    {
                        throw new Exception(txtJogador2.Text);
                    }
                }
                #endregion

                #region Linha 3
                if (!string.IsNullOrEmpty(Matriz[2][0]) && !string.IsNullOrEmpty(Matriz[2][1]) && !string.IsNullOrEmpty(Matriz[2][2]))
                {
                    if (Matriz[2][0] == "O" && Matriz[2][1] == "O" && Matriz[2][2] == "O")
                    {
                        throw new Exception(txtJogador1.Text);
                    }
                    else if (Matriz[2][0] == "X" && Matriz[2][1] == "X" && Matriz[2][2] == "X")
                    {
                        throw new Exception(txtJogador2.Text);
                    }
                }
                #endregion

                #region Coluna 1
                if (!string.IsNullOrEmpty(Matriz[0][0]) && !string.IsNullOrEmpty(Matriz[1][0]) && !string.IsNullOrEmpty(Matriz[2][0]))
                {
                    if (Matriz[0][0] == "O" && Matriz[1][0] == "O" && Matriz[2][0] == "O")
                    {
                        throw new Exception(txtJogador1.Text);
                    }
                    else if (Matriz[0][0] == "X" && Matriz[1][0] == "X" && Matriz[2][0] == "X")
                    {
                        throw new Exception(txtJogador2.Text);
                    }
                }
                #endregion

                #region Coluna 2
                if (!string.IsNullOrEmpty(Matriz[0][1]) && !string.IsNullOrEmpty(Matriz[1][1]) && !string.IsNullOrEmpty(Matriz[2][1]))
                {
                    if (Matriz[0][1] == "O" && Matriz[1][1] == "O" && Matriz[2][1] == "O")
                    {
                        throw new Exception(txtJogador1.Text);
                    }
                    else if (Matriz[0][1] == "X" && Matriz[1][1] == "X" && Matriz[2][1] == "X")
                    {
                        throw new Exception(txtJogador2.Text);
                    }
                }
                #endregion

                #region Coluna 3
                if (!string.IsNullOrEmpty(Matriz[0][2]) && !string.IsNullOrEmpty(Matriz[1][2]) && !string.IsNullOrEmpty(Matriz[2][2]))
                {
                    if (Matriz[0][2] == "O" && Matriz[1][2] == "O" && Matriz[2][2] == "O")
                    {
                        throw new Exception(txtJogador1.Text);
                    }
                    else if (Matriz[0][2] == "X" && Matriz[1][2] == "X" && Matriz[2][2] == "X")
                    {
                        throw new Exception(txtJogador2.Text);
                    }
                }
                #endregion

                #region Diagonal 1
                if (!string.IsNullOrEmpty(Matriz[0][0]) && !string.IsNullOrEmpty(Matriz[1][1]) && !string.IsNullOrEmpty(Matriz[2][2]))
                {
                    if (Matriz[0][0] == "O" && Matriz[1][1] == "O" && Matriz[2][2] == "O")
                    {
                        throw new Exception(txtJogador1.Text);
                    }
                    else if (Matriz[0][0] == "X" && Matriz[1][1] == "X" && Matriz[2][2] == "X")
                    {
                        throw new Exception(txtJogador2.Text);
                    }
                }
                #endregion

                #region Diagonal 2
                if (!string.IsNullOrEmpty(Matriz[0][2]) && !string.IsNullOrEmpty(Matriz[1][1]) && !string.IsNullOrEmpty(Matriz[2][0]))
                {
                    if (Matriz[0][2] == "O" && Matriz[1][1] == "O" && Matriz[2][0] == "O")
                    {
                        throw new Exception(txtJogador1.Text);
                    }
                    else if (Matriz[0][2] == "X" && Matriz[1][1] == "X" && Matriz[2][0] == "X")
                    {
                        throw new Exception(txtJogador2.Text);
                    }
                }
                #endregion

                #region Velha
                if (!string.IsNullOrEmpty(Matriz[0][0]) && !string.IsNullOrEmpty(Matriz[0][1]) && !string.IsNullOrEmpty(Matriz[0][2])
                    && !string.IsNullOrEmpty(Matriz[1][0]) && !string.IsNullOrEmpty(Matriz[1][1]) && !string.IsNullOrEmpty(Matriz[1][2])
                    && !string.IsNullOrEmpty(Matriz[2][0]) && !string.IsNullOrEmpty(Matriz[2][1]) && !string.IsNullOrEmpty(Matriz[2][2]))
                {
                    throw new Exception("Velha");
                }
                #endregion
            }
            catch (Exception ex)
            {
                btnJogar.Text = "Jogar novamente";
                btnJogar.Enabled = true; 
                HabilitarBotoes(false);

                if (ex.Message.Equals("Velha"))
                    MessageBox.Show(ex.Message);
                else
                    MessageBox.Show("O " + ex.Message + " jogador é o ganhador");
            }
        }

        public void HabilitarBotoes(bool hamilitado)
        {
            btn00.Enabled = hamilitado;
            btn01.Enabled = hamilitado;
            btn02.Enabled = hamilitado;

            btn10.Enabled = hamilitado;
            btn11.Enabled = hamilitado;
            btn12.Enabled = hamilitado;

            btn20.Enabled = hamilitado;
            btn21.Enabled = hamilitado;
            btn22.Enabled = hamilitado;
        }

        private void btnJogar_Click(object sender, EventArgs e)
        {
            try
            {
                Escolha = "O";
                #region Matriz
                Matriz = new List<List<string>>();
                List<string> itens = new List<string>();
                itens.Add("");
                itens.Add("");
                itens.Add("");
                Matriz.Add(itens);

                itens = new List<string>();
                itens.Add("");
                itens.Add("");
                itens.Add("");
                Matriz.Add(itens);

                itens = new List<string>();
                itens.Add("");
                itens.Add("");
                itens.Add("");
                Matriz.Add(itens);
                #endregion

                if (btnJogar.Text == "Jogar novamente")
                {
                    btn00.Text = "";
                    btn00.BackColor = Color.Transparent;

                    btn01.Text = "";
                    btn01.BackColor = Color.Transparent;

                    btn02.Text = "";
                    btn02.BackColor = Color.Transparent;

                    btn10.Text = "";
                    btn10.BackColor = Color.Transparent;

                    btn11.Text = "";
                    btn11.BackColor = Color.Transparent;

                    btn12.Text = "";
                    btn12.BackColor = Color.Transparent;

                    btn20.Text = "";
                    btn20.BackColor = Color.Transparent;

                    btn21.Text = "";
                    btn21.BackColor = Color.Transparent;

                    btn22.Text = "";
                    btn22.BackColor = Color.Transparent;

                    HabilitarBotoes(false);

                    btnJogar.Text = "Jogar";
                }
                else
                {
                    if (string.IsNullOrEmpty(txtJogador1.Text))
                    {
                        txtJogador1.Focus();
                        throw new Exception("Informe o primeiro jogador");
                    }
                    if (string.IsNullOrEmpty(txtJogador2.Text))
                    {
                        txtJogador2.Focus();
                        throw new Exception("Informe o segundo jogador");
                    }

                    HabilitarBotoes(true);

                    btnJogar.Enabled = false;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void btn00_Click(object sender, EventArgs e)
        {
            Matriz[0][0] = Escolha;
            btn00.Text = Escolha;
            btn00.Enabled = false;
            btn00.BackColor = Escolha.Equals("O") ? Color.Blue : Color.Red;
            MudarEscolha();
            VerificarGanhador();
        }

        private void btn01_Click(object sender, EventArgs e)
        {
            Matriz[0][1] = Escolha;
            btn01.Text = Escolha;
            btn01.Enabled = false;
            btn01.BackColor = Escolha.Equals("O") ? Color.Blue : Color.Red;
            MudarEscolha();
            VerificarGanhador();
        }

        private void btn02_Click(object sender, EventArgs e)
        {
            Matriz[0][2] = Escolha;
            btn02.Text = Escolha;
            btn02.Enabled = false;
            btn02.BackColor = Escolha.Equals("O") ? Color.Blue : Color.Red;
            MudarEscolha();
            VerificarGanhador();
        }

        private void btn10_Click(object sender, EventArgs e)
        {
            Matriz[1][0] = Escolha;
            btn10.Text = Escolha;
            btn10.Enabled = false;
            btn10.BackColor = Escolha.Equals("O") ? Color.Blue : Color.Red;
            MudarEscolha();
            VerificarGanhador();
        }

        private void btn11_Click(object sender, EventArgs e)
        {
            Matriz[1][1] = Escolha;
            btn11.Text = Escolha;
            btn11.Enabled = false;
            btn11.BackColor = Escolha.Equals("O") ? Color.Blue : Color.Red;
            MudarEscolha();
            VerificarGanhador();
        }

        private void btn12_Click(object sender, EventArgs e)
        {
            Matriz[1][2] = Escolha;
            btn12.Text = Escolha;
            btn12.Enabled = false;
            btn12.BackColor = Escolha.Equals("O") ? Color.Blue : Color.Red;
            MudarEscolha();
            VerificarGanhador();
        }

        private void btn20_Click(object sender, EventArgs e)
        {
            Matriz[2][0] = Escolha;
            btn20.Text = Escolha;
            btn20.Enabled = false;
            btn20.BackColor = Escolha.Equals("O") ? Color.Blue : Color.Red;
            MudarEscolha();
            VerificarGanhador();
        }

        private void btn21_Click(object sender, EventArgs e)
        {
            Matriz[2][1] = Escolha;
            btn21.Text = Escolha;
            btn21.Enabled = false;
            btn21.BackColor = Escolha.Equals("O") ? Color.Blue : Color.Red;
            MudarEscolha();
            VerificarGanhador();
        }

        private void btn22_Click(object sender, EventArgs e)
        {
            Matriz[2][2] = Escolha;
            btn22.Text = Escolha;
            btn22.Enabled = false;
            btn22.BackColor = Escolha.Equals("O") ? Color.Blue : Color.Red;
            MudarEscolha();
            VerificarGanhador();
        }
    }
}
