package id.pkl.raport.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name="siswa")
public class Siswa {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Long id;
	
	@NotBlank
	@Column(name="nama_siswa")
	private String namaSiswa;
	
	@NotNull
	@Temporal(TemporalType.DATE)
	@Column(name="tanggal_lahir")
	private Date tanggalLahir = new Date();
	
	@Enumerated(EnumType.STRING)
	@Column(name="jenis_kelamin")
	private JenisKelamin jenisKelamin;
	
	@NotBlank
	@Column(name="nama_bapak")
	private String namaBapak;
	
	@NotBlank
	@Email
	@Column(name="email_bapak")
	private String emailBapak;
	
	@NotBlank
	@Column(name="nama_ibu")
	private String namaIbu;
	
	@NotBlank
	@Email
	@Column(name="email_ibu")
	private String emailIbu;
	
	@Temporal(TemporalType.DATE)
	@Column(name="diterima_sejak")
	private Date diterimaSejak = new Date();
	
	@ManyToOne
	@JoinColumn(name="sekolah_id", referencedColumnName="id")
	private Sekolah sekolah;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNamaSiswa() {
		return namaSiswa;
	}

	public void setNamaSiswa(String namaSiswa) {
		this.namaSiswa = namaSiswa;
	}

	public Sekolah getSekolah() {
		return sekolah;
	}

	public void setSekolah(Sekolah sekolah) {
		this.sekolah = sekolah;
	}

	public Date getTanggalLahir() {
		return tanggalLahir;
	}

	public void setTanggalLahir(Date tanggalLahir) {
		this.tanggalLahir = tanggalLahir;
	}

	public JenisKelamin getJenisKelamin() {
		return jenisKelamin;
	}

	public void setJenisKelamin(JenisKelamin jenisKelamin) {
		this.jenisKelamin = jenisKelamin;
	}

	public String getNamaBapak() {
		return namaBapak;
	}

	public void setNamaBapak(String namaBapak) {
		this.namaBapak = namaBapak;
	}

	public String getEmailBapak() {
		return emailBapak;
	}

	public void setEmailBapak(String emailBapak) {
		this.emailBapak = emailBapak;
	}

	public String getNamaIbu() {
		return namaIbu;
	}

	public void setNamaIbu(String namaIbu) {
		this.namaIbu = namaIbu;
	}

	public String getEmailIbu() {
		return emailIbu;
	}

	public void setEmailIbu(String emailIbu) {
		this.emailIbu = emailIbu;
	}

	public Date getDiterimaSejak() {
		return diterimaSejak;
	}

	public void setDiterimaSejak(Date diterimaSejak) {
		this.diterimaSejak = diterimaSejak;
	}
	
	
}
