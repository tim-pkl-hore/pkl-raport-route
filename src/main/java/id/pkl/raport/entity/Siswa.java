package id.pkl.raport.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.format.annotation.DateTimeFormat;

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
	
	@NotBlank
	@Column(name="nisn", unique = true)
	private String nisn;
	
	@NotNull
	@Column(name="tempat_lahir")
	private String tempatLahir;
	
	@NotNull
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd.MM.yyyy")
	@Column(name="tanggal_lahir")
	private Date tanggalLahir = new Date();
	
	@NotBlank
	@Column(name="alamat_siswa")
	private String alamatSiswa;
	
	@Enumerated(EnumType.STRING)
	@Column(name="jenis_kelamin")
	private JenisKelamin jenisKelamin;
	
	@NotBlank
	@Column(name="nama_ayah")
	private String namaAyah;
	
	
	@NotBlank
	@Column(name="nama_ibu")
	private String namaIbu;
	
	@NotBlank
	@Column(name="alamat_ortu")
	private String alamatOrtu;
	
	@NotNull
	@Column(name="telp_ortu")
	private String telpOrtu;
	
	@NotNull
	@Column(name="pekerjaan_ibu")
	private String pekerjaanIbu;
	
	@NotNull
	@Column(name="pekerjaan_ayah")
	private String pekerjaanAyah;
	
	@Column(name="nama_wali")
	private String namaWali;
	
	@Column(name="alamat_wali")
	private String alamatWali;
	
	@Column(name="pekerjaan_wali")
	private String pekerjaanWali;
	
	@NotNull
	@Column(name="no_ijazah")
	private String noIjazah;
	
	@NotNull
	@Column(name="tahun_sekolah_asal")
	private String tahunSekolahAsal;
	
	@NotNull
	@Column(name="telp_siswa")
	private String telpSiswa;
	
	
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd.mm.yyyy")
	@Column(name="diterima_sejak")
	private Date diterimaSejak = new Date();


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


	public String getNisn() {
		return nisn;
	}


	public void setNisn(String nisn) {
		this.nisn = nisn;
	}


	public String getTempatLahir() {
		return tempatLahir;
	}


	public void setTempatLahir(String tempatLahir) {
		this.tempatLahir = tempatLahir;
	}


	public Date getTanggalLahir() {
		return tanggalLahir;
	}


	public void setTanggalLahir(Date tanggalLahir) {
		this.tanggalLahir = tanggalLahir;
	}


	public String getAlamatSiswa() {
		return alamatSiswa;
	}


	public void setAlamatSiswa(String alamatSiswa) {
		this.alamatSiswa = alamatSiswa;
	}


	public JenisKelamin getJenisKelamin() {
		return jenisKelamin;
	}


	public void setJenisKelamin(JenisKelamin jenisKelamin) {
		this.jenisKelamin = jenisKelamin;
	}


	public String getNamaAyah() {
		return namaAyah;
	}


	public void setNamaAyah(String namaAyah) {
		this.namaAyah = namaAyah;
	}


	public String getNamaIbu() {
		return namaIbu;
	}


	public void setNamaIbu(String namaIbu) {
		this.namaIbu = namaIbu;
	}


	public String getAlamatOrtu() {
		return alamatOrtu;
	}


	public void setAlamatOrtu(String alamatOrtu) {
		this.alamatOrtu = alamatOrtu;
	}


	public String getTelpOrtu() {
		return telpOrtu;
	}


	public void setTelpOrtu(String telpOrtu) {
		this.telpOrtu = telpOrtu;
	}


	public String getPekerjaanIbu() {
		return pekerjaanIbu;
	}


	public void setPekerjaanIbu(String pekerjaanIbu) {
		this.pekerjaanIbu = pekerjaanIbu;
	}


	public String getPekerjaanAyah() {
		return pekerjaanAyah;
	}


	public void setPekerjaanAyah(String pekerjaanAyah) {
		this.pekerjaanAyah = pekerjaanAyah;
	}


	public String getNamaWali() {
		return namaWali;
	}


	public void setNamaWali(String namaWali) {
		this.namaWali = namaWali;
	}


	public String getAlamatWali() {
		return alamatWali;
	}


	public void setAlamatWali(String alamatWali) {
		this.alamatWali = alamatWali;
	}


	public String getNoIjazah() {
		return noIjazah;
	}


	public void setNoIjazah(String noIjazah) {
		this.noIjazah = noIjazah;
	}


	public String getTahunSekolahAsal() {
		return tahunSekolahAsal;
	}


	public void setTahunSekolahAsal(String tahunSekolahAsal) {
		this.tahunSekolahAsal = tahunSekolahAsal;
	}


	public String getTelpSiswa() {
		return telpSiswa;
	}


	public void setTelpSiswa(String telpSiswa) {
		this.telpSiswa = telpSiswa;
	}


	public Date getDiterimaSejak() {
		return diterimaSejak;
	}


	public void setDiterimaSejak(Date diterimaSejak) {
		this.diterimaSejak = diterimaSejak;
	}


	public String getPekerjaanWali() {
		return pekerjaanWali;
	}


	public void setPekerjaanWali(String pekerjaanWali) {
		this.pekerjaanWali = pekerjaanWali;
	}
	
	
}
